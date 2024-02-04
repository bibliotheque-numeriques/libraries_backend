CREATE TABLE "borrow"(
    id_borrow uuid primary key,
    id_user uuid REFERENCES "user"(id_user),
    id_book uuid REFERENCES "book"(id_book)
);