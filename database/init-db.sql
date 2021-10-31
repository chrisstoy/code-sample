/*
 * SQL to initialize the CodeSample database
 */

/* Create the Postgres user that will own all of the data */
CREATE USER codesample WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'CodeSample123';
COMMENT ON ROLE codesample IS 'User for accessing the CodeSample database';

/* Create the database */
CREATE DATABASE code_sample
    WITH 
    OWNER = codesample
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
COMMENT ON DATABASE code_sample
    IS 'CodeSample database storing users, notes, and tokens';


GRANT ALL PRIVILEGES ON DATABASE code_sample TO codesample;

\connect code_sample;

/* Create the Schema for the Code Sample */
CREATE SCHEMA sample
    AUTHORIZATION codesample;
COMMENT ON SCHEMA sample
    IS 'Schema containing tables for CodeSample';


/* Create the Users table */
CREATE TABLE sample.users
(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    is_admin boolean NOT NULL,
    last_login timestamp without time zone NOT NULL
);
ALTER TABLE sample.users
    OWNER to codesample;
COMMENT ON TABLE sample.users
    IS 'List of all users';


/* Create the Notes table that holds every note created by users */
CREATE TABLE sample.notes
(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid NOT NULL,
    last_update timestamp without time zone NOT NULL,
    title character varying(128) NOT NULL,
    text character varying(2048) NOT NULL
);
ALTER TABLE sample.notes
    OWNER to codesample;
COMMENT ON TABLE sample.notes
    IS 'Notes created by users';


/* Create the Passwords table */
CREATE TABLE sample.passwords
(
    user_id uuid NOT NULL PRIMARY KEY,
    password character varying(45) NOT NULL,
    last_changed timestamp without time zone NOT NULL
);
ALTER TABLE sample.passwords
    OWNER to codesample;
COMMENT ON TABLE sample.passwords
    IS 'Passwords for each user';


/* Create the logn Tokens table */
CREATE TABLE sample.tokens
(
    user_id uuid NOT NULL PRIMARY KEY,
    token character varying(40) NOT NULL,
    issued timestamp without time zone NOT NULL
);
ALTER TABLE sample.tokens
    OWNER to codesample;
COMMENT ON TABLE sample.tokens
    IS 'Active login tokens for each user';

/*
 * Initialize the database with some sample data
 */

INSERT INTO sample.users 
(id, first_name, last_name, email, is_admin, last_login)
VALUES
('5450e4d9-3f69-4921-ad6f-28208e0f3860', 'Luke', 'Skywalker', 'luke@tatooine.net', false, CURRENT_TIMESTAMP),
('e228db4a-d45c-4d09-9d2d-92e97ab3464a', 'Darth', 'Vader', 'darth.vader@deathstar.gov', true, CURRENT_TIMESTAMP);

INSERT INTO sample.passwords 
(user_id, password, last_changed)
VALUES
('5450e4d9-3f69-4921-ad6f-28208e0f3860', 'ILoveBlueMilk', CURRENT_TIMESTAMP),
('e228db4a-d45c-4d09-9d2d-92e97ab3464a', 'lavaSux1', CURRENT_TIMESTAMP);


INSERT INTO sample.notes
(id, owner_id, last_update, title, text)
VALUES
('db7d4695-daf8-4bfb-a5c1-4b2f8c7a32fb', '5450e4d9-3f69-4921-ad6f-28208e0f3860', CURRENT_TIMESTAMP, 'Things to Do', '* go running\n* lift rocks with the force\n* avoid seaguls'),
('1cdb54bd-8943-4c98-b212-3e504147ff77', 'e228db4a-d45c-4d09-9d2d-92e97ab3464a', CURRENT_TIMESTAMP, 'Why I like the Dark Side', 'The dark side is cool because I get to wear a cool mask.'),
('f11f09f9-8dcb-4b63-84b7-37b24e000359', '5450e4d9-3f69-4921-ad6f-28208e0f3860', CURRENT_TIMESTAMP, 'Poem', 'Roses are red, violets are blue, Yoda uses the force, and I do too!');

