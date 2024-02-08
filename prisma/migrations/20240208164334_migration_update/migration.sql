/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_author` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `first_name` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `nationality` on the `Author` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_book` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `title` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `langage` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - The primary key for the `Borrow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_borrow` column on the `Borrow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_category` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `type` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_user` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `first_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - Added the required column `link_image_book` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id_category` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_author` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_user` on the `Borrow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_book` on the `Borrow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `link_image_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_id_author_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_id_book_fkey";

-- DropForeignKey
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_id_user_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
DROP COLUMN "id_author",
ADD COLUMN     "id_author" SERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "nationality" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id_author");

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ADD COLUMN     "link_image_book" TEXT NOT NULL,
DROP COLUMN "id_book",
ADD COLUMN     "id_book" SERIAL NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "langage" SET DATA TYPE VARCHAR(30),
DROP COLUMN "id_category",
ADD COLUMN     "id_category" INTEGER NOT NULL,
DROP COLUMN "id_author",
ADD COLUMN     "id_author" INTEGER NOT NULL,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("id_book");

-- AlterTable
ALTER TABLE "Borrow" DROP CONSTRAINT "Borrow_pkey",
DROP COLUMN "id_borrow",
ADD COLUMN     "id_borrow" SERIAL NOT NULL,
DROP COLUMN "id_user",
ADD COLUMN     "id_user" INTEGER NOT NULL,
DROP COLUMN "id_book",
ADD COLUMN     "id_book" INTEGER NOT NULL,
ADD CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id_borrow");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id_category",
ADD COLUMN     "id_category" SERIAL NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(150),
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id_category");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "link_image_user" TEXT NOT NULL,
DROP COLUMN "id_user",
ADD COLUMN     "id_user" SERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(150),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "Author"("id_author") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Book"("id_book") ON DELETE RESTRICT ON UPDATE CASCADE;
