CREATE TABLE "category"(
    id_category UUID DEFAULT uuid_generate_v4() primary key,
    type varchar(50) NOT NULL,
    description varchar(250)
);