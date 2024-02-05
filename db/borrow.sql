CREATE TABLE "borrow"(
    id_borrow UUID DEFAULT uuid_generate_v4() primary key,
    id_user uuid REFERENCES "user"(id_user),
    id_book uuid REFERENCES "book"(id_book)
);