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
    const book = prisma.book.findFirst();
    return res.json({book});
}

book.post('/book',createBook);
book.get('/book',getBook);

export default book;