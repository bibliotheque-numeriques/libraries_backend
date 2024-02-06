import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

const user = express();
const prisma = new PrismaClient();
user.use(express.json());
const schema = new passwordValidator();
schema
  .is().min(8) 
  .has().uppercase() 
  .has().digits();


 export const LoginUser = async (req : Request, res : Response)=>{
  const { email, password } = req.body;
  
  
  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }

  if (!user) {
    return res.status(401).json({ error: 'Email or password doesnt exist' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'incorect password' });
  }

  res.json({ user });
}


export const registerUser = async(req : Request, res : Response)=>{
  const {name,first_name,email,password,sign_date,matricule,role} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);
  const user = await prisma.user.create({
    data: {
      name : name,
      first_name : first_name,
      email : email,
      password : hashedPassword,
      sign_date : sign_date,
      matricule : matricule,
      role : role,
    },
  })

  res.json({ user });
}

user.post('/user', LoginUser);
user.post('/register',registerUser);


export default user;