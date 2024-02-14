import { Prisma, PrismaClient } from "@prisma/client";
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

export default author;
