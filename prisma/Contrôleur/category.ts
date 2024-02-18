import { Prisma, PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const category = express();
category.use(express.json());

export const createCategory = async (req: Request, res: Response) => {
  const { type, description } = req.body;

  const category = await prisma.category.create({
    data: {
      type: type,
      description: description,
    },
  });

  res.json({ category });
};

export const findCategory = async (req: Request, res: Response) => {
  const category = prisma.category.findFirst();

  res.json({ category });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);

  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id_category: categoryId,
      },
    });

    res.json({ message: `Category with ID ${categoryId} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id, 10);
  const { type, description } = req.body;
  try {
    const updateCategory = await prisma.category.update({
      where: {
        id_category: categoryId,
      },
      data: {
        type: type,
        description: description,
      },
    });

    res.json({ message: `Category with ID ${categoryId} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the category" });
  }
};

export default category;
