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
exports.Helper = void 0;
const logger_1 = __importDefault(require("./logger"));
class Helper {
    static removeIdFromRecords(records) {
        for (const record of records) {
            Helper.removeIdFromRecord(record);
        }
    }
    static removeIdFromRecord(record) {
        delete record.id;
        record.isDeleted && delete record.isDeleted;
    }
    static removePassword(record) {
        delete record.password;
        record.isDeleted && delete record.isDeleted;
    }
    static getUniqueReference(prefix) {
        return `${prefix}${(Date.now().toString(36) + Math.random().toString(36).substring(2)).toUpperCase()}`;
    }
    static paginate(Model, page, size, conditions) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pageToUse = Number(page) - 1;
                const pageSizeToUse = Number(size);
                const recordsToSkip = pageToUse * pageSizeToUse;
                const data = yield Model.findMany(Object.assign(Object.assign({ skip: recordsToSkip, take: pageSizeToUse }, conditions), { orderBy: {
                        updatedAt: "desc",
                    } }));
                Helper.removeIdFromRecords(data);
                delete conditions.include;
                const numberOfRecords = data.length
                    ? yield Model.count(Object.assign({}, conditions))
                    : 0;
                const totalPages = numberOfRecords > 0 ? Math.ceil(numberOfRecords / pageSizeToUse) : 1;
                resolve({
                    total: numberOfRecords,
                    count: data.length,
                    data,
                    totalPages,
                    currentPage: pageToUse + 1,
                });
            }
            catch (error) {
                logger_1.default.info(error);
                reject(error);
            }
        }));
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map