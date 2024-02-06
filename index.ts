//login
import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import passwordValidator from 'password-validator';

const app = express();
const port = 8080;
const prisma = new PrismaClient();
app.use(express.json());
const schema = new passwordValidator();
schema
  .is().min(8) 
  .has().uppercase() 
  .has().digits();


app.post('/login', async (req : Request, res : Response)=>{
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
})


app.post('/register',async(req : Request, res : Response)=>{
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
})



app.listen(port, () =>{
console.log(`Server is running on port: http://localhost:${port}`);
})