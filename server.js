import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1202;

app.use(express.json());

const books = [
  {
    id: 1,
    name: "Kane and Abel",
    author: "Jeffrey Archer",
  },
  {
    id: 2,
    name: "The alchemist",
    author: "Paulo Coelho",
  },
];

app.get("/books", authenToken, (req, res) => {
  res.json({ status: "Success", data: books });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  const token = authorizationHeader?.split(" ")[1];
  if (!token) res.sendStatus(401);
  else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(err, data);
      if (err) res.sendStatus(403);
      next();
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
