CREATE TABLE "book"(
    id_book uuid primary key,
    title varchar(30) NOT NULL,
    page int NOT NULL,
    langage varchar(50) NOT NULL,
    description varchar(250),
    parution_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id_category uuid REFERENCES "category"(id_category)
);

