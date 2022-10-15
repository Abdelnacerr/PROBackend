CREATE TABLE users
  (
    id UUID DEFAULT uuid_generate_v4(),
    mobile VARCHAR(20)  NOT NULL,
    "isDeleted" BOOLEAN DEFAULT FALSE NOT NULL,
    "typeId" UUID REFERENCES "userType" (id),
    PRIMARY KEY(id),
    UNIQUE(mobile)
  );

  -- insert data into users table
  INSERT INTO users (mobile)
  VALUES  (
    +61422673013
  );

UPDATE users 
set "typeId" = (select id from "userType" WHERE id = '42e8a020-9128-4963-b06d-e593bb48821a') 
WHERE id='1a1e2f3e-b5e3-4c28-b370-9398e89c8049';

--alter users table, set column name of "typeId" to "type"
ALTER TABLE users RENAME COLUMN "typeId" TO "type";

--change column mobile to varchar
ALTER TABLE users ALTER COLUMN mobile TYPE VARCHAR(20);
