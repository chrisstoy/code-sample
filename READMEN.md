**Target RWE Code Test**
Chris Stoy
chisstoy@gmail.com

Design Goals:

- Notepad app utilizing Angular, Express.js, and PostgeSQL

- Each user can create, edit, and delete Notes.

- Admin can manipulate the Users in the system

- Each component deployed in a Docker container

To start:

> npm run install
> npm run build-all
> npm run run-all

Ensure you have Docker installed.

Open web browser to `http:localhost`

CURRENT ISSUES:

- server running in Docker fails to connect to database Docker due to host IP not being set correctly
- webapp fails to connect to server due to CORS errors. webapp is using mock data
- no user login or admin support in webapp
- missing a LOT of unit tests

## Initial Design

## Database Tables

user: codesample
password: CodeSample123

    Users
    	id: string,
    	first_name: string,
    	last_name: string,
    	email: string,
    	role: Admin | User
    	password: string
    	last_login: Date

    Notes
    	id: string,
    	owner_id: string,
    	last_update: Date,
    	title: string,
    	text: string

    Tokens
    	user_id: string,
    	token: string,
    	issued: Date

See `database/init-db.sql` for final table structures.

```sql
CREATE TABLE public.users
(
    id character varying(40) NOT NULL,
    first_name character varying(45) NOT NULL,
    last_name character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    "isAdmin" boolean NOT NULL,
    password character varying(45),
    last_login date NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.users
    OWNER to codesample;
COMMENT ON TABLE public.users
    IS 'List of all users';

----
CREATE TABLE public.notes
(
    id character varying(40) NOT NULL,
    owner_id character varying(40) NOT NULL,
    last_update date NOT NULL,
    title character varying(128) NOT NULL,
    text character varying(2048) NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.notes
    OWNER to codesample;
COMMENT ON TABLE public.notes
    IS 'Notes created by users';

----

CREATE TABLE public.tokens
(
    token character varying(40) NOT NULL,
    user_id character varying(40) NOT NULL,
    issued date NOT NULL,
    PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.tokens
    OWNER to codesample;
COMMENT ON TABLE public.tokens
    IS 'Active login tokens for each user';
```

## API

    /admin
    	GET /admin/users	- returns list of all users in the system
    	DELETE /admin/users/{{user-id}} - delete a user and all of their notes from the system
    	POST /admin/users/{{user-id}}/reset-password	- force resetting a user's password
    	POST /admin/users/{{user-id}}/logout - force logging out a user

    /users
    	PUT /users	- create a new user. Returns the new user record
    		User: {
    			id: string?,
    			first_name: string,
    			last_name: string,
    			email: string,
    			password: string
    		}

    	GET /users/{{user-id}}	- returns details for the specified user
    		User

    	POST /users/{{user-id}} - edit an existing user
    		User

    	POST /users/{{user-id}}/password - change a user's password
    		Password: {
    			old_password: string,
    			new_password: string
    		}

    	DELETE /users/{{user-id}} - delete a user and all of their notes from the system

    	POST /users/authenticate - authenticate a login attempt and return basic auth token if successful
    		Auth {
    			user_id: string,
    			password: string
    		}

    	POST /users/logout - removes the valid token for the currently logged in user
    		Empty

    /notes
    	GET /notes/{{userid}}	- return list of all Notes for this user
    		[ NoteSummary: {
    			id: string
    			title: string
    			last_update: Date,
    		}]

    	PUT /notes/{{user-id}}	- create a new note
    		Note: {
    			id: string?,
    			title: string,
    			text: string
    			last_update: Date,
    		}

    	GET /notes/{{user-id}}/{{note-id}}	- get an existing note
    		Note: {
    			id: string,
    			title: string,
    			text: string,
    			last_update: Date,
    		}

    	POST /notes/{{user-id}}/{{note-id}}	- update an existing note
    		Note: {
    			id: string?,
    			title: string,
    			text: string,
    			last_update: Date,
    		}

    	DELETE /notes/{{user-id}}/{{note-id}} - delete an existing note

## Web App

    /login	- main login page.  user taken here if no valid token

    /new-user - create a new user

    /admin - administration page
    	list of users

    /notes - list of notes for the current user
    	user can create a new note, open an existing note, or delete an existing note

    /note/{{note-id}}	- note editor. if note-id is empty, creates a new note
