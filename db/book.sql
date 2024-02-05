CREATE TABLE "book"(
    id_book UUID DEFAULT uuid_generate_v4() primary key,
    title varchar(30) NOT NULL,
    page int NOT NULL,
    langage varchar(50) NOT NULL,
    description varchar(250),
    parution_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    id_category UUID REFERENCES "category"(id_category)
);

