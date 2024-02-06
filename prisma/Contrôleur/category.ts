import { Prisma, PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
const category = express();
category.use(express.json());

export const createCategory = async (req : Request, res : Response)=>{
        const {type,description,} = req.body;

const category = await prisma.category.create({
    data : {
        type : type,
        description : description
    }
})

res.json({ category })

}

export const findCategory = async (req : Request, res : Response)=>{
    const category = prisma.category.findFirst();

    res.json({ category })
}

export default category;