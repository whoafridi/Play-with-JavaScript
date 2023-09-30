"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_uniqwith_1 = __importDefault(require("./lodash.uniqwith"));
const uniqueItems = (items) => (0, lodash_uniqwith_1.default)(items, (a, b) => a.src === b.src && a.width === b.width && a.quality === b.quality);
exports.default = uniqueItems;
