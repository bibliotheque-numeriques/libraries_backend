CREATE TABLE "author"(
    id_author uuid primary key,
    name varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    biography varchar(250),
    nationality varchar(20),
    die_date TIMESTAMP WITH TIME ZONE,
    birth_date TIMESTAMP WITH TIME ZONE,
    id_book uuid REFERENCES "book"(id_book)
);