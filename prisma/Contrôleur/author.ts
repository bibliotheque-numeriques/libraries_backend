import { Author, Prisma, PrismaClient } from "@prisma/client";
import e from "express";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const author = express();
author.use(express.json());

export const createAuthor = async (req: Request, res: Response) => {
  const { name, first_name, biography, nationality, die_date, birth_date } =
    req.body;

  const author = await prisma.author.create({
    data: {
      name: name,
      first_name: first_name,
      biography: biography,
      nationality: nationality,
      die_date: die_date,
      birth_date: birth_date,
    },
  });

  res.json({ author });
};

export const findAuthor = async (req: Request, res: Response) => {
  const author = await prisma.author.findFirst();

  res.json({ author });
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const authorId = parseInt(req.params.id, 10);

  try {
    const deletedAuthor = await prisma.author.delete({
      where: {
        id_author: authorId,
      },
    });

    res.json({ message: `Author with ID ${authorId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the author" });
  }
};


export default author;
