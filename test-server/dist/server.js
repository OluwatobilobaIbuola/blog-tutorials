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
    console.log(data === null || data === void 0 ? void 0 : data.paymentRef);
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
app.listen(process.env.PORT || 8080, () => {
    logger_1.default.info(`Server listening on port ${process.env.PORT || 8080}`);
});
//# sourceMappingURL=server.js.map