import { Prisma, PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const book = express();
book.use(express.json());

export const createBook = async(req : Request, res : Response)=>{
    const {title, page,langage,description,parution_date,id_category,id_author } = req.body;

    const book = await prisma.book.create({
     data : {
        title : title,
        page : page,
        langage : langage,
        description : description,
        parution_date : parution_date,
        id_category : id_category,
        id_author : id_author 
     }
    })

    res.json({ book });
}

export const getBook = async(req : Request, res: Response)=>{
    try {
        const booksWithAuthorsAndCategories = await prisma.book.findMany({
          include: {
            author: true,
            category: true,
          },
        });
        res.json({booksWithAuthorsAndCategories});
      } catch (error) {
        res.status(500).json({ error: 'Could not fetch books with authors and categories' });
      }
}



export default book;