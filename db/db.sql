DROP DATABASE digital_library;

\c digital_library

CREATE TABLE IF NOT EXISTS "user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    first_name VARCHAR(250) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(20) NOT NULL,
    sign_date DATE DEFAULT NOW(),
    matricule VARCHAR(50) NOT NULL,
    role VARCHAR(10) CHECK (ADMIN, USER) NOT NULL,-- admin or user
    link_image_user varchar(250)
);

CREATE TABLE IF NOT EXISTS "category"{
    id_category SERIAL primary key,
    type varchar(20) NOT NULL,
    description varchar(50)
};

CREATE TABLE IF NOT EXISTS "book"(
    id_book SERIAL primary key,
    title varchar(250) NOT NULL,
    page int NOT NULL,
    langage varchar(250) NOT NULL,
    description varchar(250),
    parution_date DATE,
    id_category int REFERENCES "category"(id_category),
    link_image_book varchar(250)
);

CREATE TABLE IF NOT EXISTS "borrow"(
    id_borrow SERIAL primary key,
    id_user SERIAL REFERENCES "user"(id_user),
    id_book SERIAL REFERENCES "book"(id_book)
);

CREATE TABLE IF NOT EXISTS "author"(
     id_author serial primary key,
     name varchar(250) NOT NULL,
     first_name varchar(250) NOT NULL,
     biography varchar(250),
     nationality varchar(10),
     die_date DATE CHECK (die_date > birth_date),
     birth_date DATE CHECK (birth_date != now),
     id_book serial REFERENCES "book"(id_book)
);