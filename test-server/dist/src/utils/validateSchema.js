"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const httpStatusCode_1 = require("../enums/httpStatusCode");
const validateBody = (schemaObject, path = undefined) => {
    return (req, res, next) => {
        var _a, _b;
        const schema = schemaObject.options({ stripUnknown: false });
        const body = path ? req[path] : (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.input) !== null && _b !== void 0 ? _b : req === null || req === void 0 ? void 0 : req.body;
        const { error } = schema.validate(body);
        if (error) {
            logger_1.default.warn(error.message);
            return res.status(httpStatusCode_1.StatusCode.BAD_REQUEST).json({
                status: false,
                statusCode: httpStatusCode_1.StatusCode.BAD_REQUEST,
                message: error.message,
            });
        }
        req.body = body;
        return next();
    };
};
exports.default = validateBody;
//# sourceMappingURL=validateSchema.js.map