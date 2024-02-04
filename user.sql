CREATE TABLE "user"(
    id_user uuid primary key,
    name varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    password varchar(8) NOT NULL,
    sign_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    matricule varchar(8) NOT NULL,
    role varchar(10) CHECK (role IN ('Admin', 'Customer'))
);