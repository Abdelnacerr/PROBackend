import {
  base64,
  distinct,
  flatMap,
  from,
  takeUntil,
  takeWhile,
  timer,
} from "../deps.ts";
import { SMSRequest } from "./modals/SMSRequest.ts";

export class TwilioSMS {
  private authorizationHeader: string;

  constructor(private accountSID: string, keySID: string, secret: string) {
    this.authorizationHeader = "Basic " +
      base64.fromUint8Array(new TextEncoder().encode(keySID + ":" + secret));
  }

  private postSMSRequest(payload: SMSRequest): Promise<string> {
    const request = fetch(
      "https://api.twilio.com/2010-04-01/Accounts/" +
        this.accountSID +
        "/Messages.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: this.authorizationHeader,
        },
        body: new URLSearchParams(payload).toString(),
      },
    ).then((resp) => resp.json());

    const uri = request.then((resp) => {
      if (resp.status != "queued") {
        return Promise.reject(resp.message);
      }
      return resp.uri;
    });
    return uri;
  }

  private pollRequestStatus(uri: string) {
    const timeout = timer(10 * 1000);

    return timer(0, 500).pipe(
      flatMap(() => {
        return from(
          fetch("https://api.twilio.com" + uri, {
            headers: {
              Authorization: this.authorizationHeader,
            },
          })
            .then((resp) => resp.json())
            .then((resp) => resp.status),
        );
      }),
      distinct(),
      takeWhile(
        (status: string) => !["delivered", "undelivered"].includes(status),
        true,
      ),
      takeUntil(timeout),
    );
  }

  public sendSms(payload: SMSRequest) {
    return from(
      this.postSMSRequest(
        payload,
      ),
    ).pipe(
      flatMap((uri: string) => this.pollRequestStatus(uri)),
    );
  }
}
