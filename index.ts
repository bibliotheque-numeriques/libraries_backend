import express, { Request, Response } from "express";
import { LoginUser, getUser, registerUser } from "./prisma/Contrôleur/login";
import { createBook, deleteBook, getBook } from "./prisma/Contrôleur/book";
import { createAuthor, deleteAuthor, findAuthor, updateAuthor } from "./prisma/Contrôleur/author";
import { createCategory, deleteCategory, findCategory, updateCategory } from "./prisma/Contrôleur/category";
import { verifyToken } from "./verifieToken";
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/book", getBook);
app.get("/author", findAuthor);
app.get("/category", findCategory);
app.get("/user", getUser);

app.get('/protected', verifyToken, (req, res) => {
  const userId = req.body.user_id;
  res.json({ message: "Route protégée", userId });
});
app.post("/login", LoginUser);
app.post("/register", registerUser);
app.post("/book", createBook);
app.post("/author", createAuthor);
app.post("/category", createCategory);
app.delete("/category", deleteCategory);
app.delete("/author", deleteAuthor);
app.delete("/book", deleteBook);

app.put("/book", updateAuthor);
app.put("/category", updateCategory);
app.put("/author", updateAuthor);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
