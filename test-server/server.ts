import dotenv from "dotenv";
import logger from "./src/utils/logger";
import express from "express";
import cors from "cors";
dotenv.config();
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/billing-service/payments/make-payment", async (req, res) => {
  const data = req.body;
  console.log(data);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    data: { data: paymentIntent.client_secret },
  });
});
app.post("/api/updateTask", (req, res) => {
  const { task, fromProject, toProject } = req.body;

  // Implement your logic to update the task in the database

  res.send({ success: true });
});
let currentUser = {
  id: "1",
  name: "Sarah Waters",
  age: 55,
  country: "United Kingdom",
  books: ["Fingersmith", "The Night Watch"],
};

let users = [
  {
    id: "1",
    name: "Sarah Waters",
    age: 55,
    country: "United Kingdom",
    books: ["Fingersmith", "The Night Watch"],
  },
  {
    id: "2",
    name: "Haruki Murakami",
    age: 71,
    country: "Japan",
    books: ["Norwegian Wood", "Kafka on the Shore"],
  },
  {
    id: "3",
    name: "Chimamanda Ngozi Adichie",
    age: 43,
    country: "Nigeria",
    books: ["Half of a Yellow Sun", "Americanah"],
  },
];

let books = [
  {
    id: "1",
    name: "To Kill a Mockingbird",
    pages: 281,
    title: "Harper Lee",
    price: 12.99,
  },
  {
    id: "2",
    name: "The Catcher in the Rye",
    pages: 224,
    title: "J.D. Salinger",
    price: 9.99,
  },
  {
    id: "3",
    name: "The Little Prince",
    pages: 85,
    title: "Antoine de Saint-Exupéry",
    price: 7.99,
  },
];

app.get("/current-user", (req, res) => res.json(currentUser));

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json(users.find((user) => user.id === id));
});

app.get("/users", (req, res) => res.json(users));

app.post("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user: editedUser } = req.body;

  users = users.map((user) => (user.id === id ? editedUser : user));

  res.json(users.find((user) => user.id === id));
});

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  res.json(books.find((book) => book.id === id));
});

app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server listening on port ${process.env.PORT || 8080}`);
});
