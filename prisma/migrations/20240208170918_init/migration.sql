-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Author" (
    "id_author" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "biography" TEXT,
    "nationality" VARCHAR(30),
    "die_date" TIMESTAMP(3),
    "birth_date" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id_author")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" TEXT NOT NULL,
    "sign_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matricule" TEXT NOT NULL,
    "link_image_user" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" SERIAL NOT NULL,
    "type" VARCHAR(150) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "Book" (
    "id_book" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "page" INTEGER NOT NULL,
    "langage" VARCHAR(30) NOT NULL,
    "description" TEXT,
    "parution_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link_image_book" TEXT NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_author" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id_book")
);

-- CreateTable
CREATE TABLE "Borrow" (
    "id_borrow" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_book" INTEGER NOT NULL,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id_borrow")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "Author"("id_author") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Book"("id_book") ON DELETE RESTRICT ON UPDATE CASCADE;
