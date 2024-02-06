import { UUID } from "crypto"
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client';

interface Book{
    idBook : UUID
    title : String
    page : number
    langage : String
    description : String
    parution_date : Date
    id_category : UUID  
}

const app = express();
const port = 8080;
const prisma = new PrismaClient();
app.use(express.json());

app.post('/book/create', async (req : Request , res : Response) =>{
    const { title, page, langage, description, parution_date, id_category} = req.body
    
    const createBook = await prisma.book.create({
        data: {
           title,
           page,
           langage,
           description,
           parution_date,
           id_category
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createBook;
})

app.get('/book/get', async (res: Response) => {
    try {
      const books = await prisma.book.findMany({
        orderBy: {title: 'asc'}
      });
   
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
   });
   