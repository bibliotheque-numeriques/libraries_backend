import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import passwordValidator from "password-validator";
import jwt from "jsonwebtoken";

const user = express();
const prisma = new PrismaClient();
user.use(express.json());
const schema = new passwordValidator();
schema.is().min(8).has().uppercase().has().digits();

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        email: email
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }

  if (!user) {
    return res.status(401).json({ error: "Email or password doesnt exist" });
  }
 
  const typedUser = user as User;

  const passwordMatch = await bcrypt.compare(password, typedUser.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "incorect password" });
  }

  const token = jwt.sign(
    {
    
      email: typedUser.email,
      
    },
    "helloyou",
  );

  res.json({ user, token });
};

export const registerUser = async (req: Request, res: Response) => {
  const {
    name,
    first_name,
    email,
    password,
    sign_date,
    matricule,
    link_image_user,
    role,
  } = req.body;


  let user = await prisma.user.findFirst({where : {email}})
  if(user){
    throw Error('User already exists !')
  }
  const hashedPassword = await bcrypt.hash(password, 10);
   user = await prisma.user.create({
    data: {
      name: name,
      first_name: first_name,
      email: email,
      password: hashedPassword,
      sign_date: sign_date,
      matricule: matricule,
      link_image_user: link_image_user,
      role: role,
    },
    
  });
 
  res.json({ user });
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Could not find user" });
  }
};

export default user;
