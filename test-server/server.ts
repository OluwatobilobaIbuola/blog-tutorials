import express, { Request, Response, Router } from "express";
import { validateToken } from "./src/utils/validateToken";

const app = express();
const route = Router();

app.use(express.json());

route.get("/me", validateToken, (req: Request, res: Response) => {
  res.send("Hello, We serve");
});

app.use(route);

app.listen(1234, () => {
  console.log("Server running on Port 1234");
});
