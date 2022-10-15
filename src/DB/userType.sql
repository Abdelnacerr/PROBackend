CREATE TABLE "userType"
  (
    id UUID DEFAULT uuid_generate_v4(),
    "userType" VARCHAR(10) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(id)
  );

--insert data into userType table

INSERT INTO "userType" ("userType")
VALUES  ('admin'), ('solo'), ('business');
