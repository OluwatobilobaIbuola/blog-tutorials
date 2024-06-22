"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./src/utils/logger"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const stripe_1 = __importDefault(require("stripe"));
const app = (0, express_1.default)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/billing-service/payments/make-payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: 1400,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        data: { data: paymentIntent.client_secret },
    });
}));
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
    logger_1.default.info(`Server listening on port ${process.env.PORT || 8080}`);
});
//# sourceMappingURL=server.js.map