import express, { Request, Response } from "express";
import {LoginUser, registerUser} from "./prisma/Contrôleur/login";
import {createBook,getBook} from "./prisma/Contrôleur/book";



const app = express();
const port = 8080;
app.use(express.json());


app.get('/book',getBook);

app.post('/login', LoginUser);
app.post('/register',registerUser);
app.post('/book',createBook);


app.listen(port, () =>{
    console.log(`Server is running on port: http://localhost:${port}`);
    })