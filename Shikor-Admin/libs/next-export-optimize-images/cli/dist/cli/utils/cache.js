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
exports.writeCacheManifest = exports.readCacheManifest = exports.createCacheDir = exports.defaultCacheFilePath = exports.defaultCacheDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.defaultCacheDir = path_1.default.resolve(process.cwd(), 'node_modules/.cache/next-export-optimize-images');
exports.defaultCacheFilePath = path_1.default.join(exports.defaultCacheDir, 'cached-images.json');
const createCacheDir = (cacheDir = exports.defaultCacheDir) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(cacheDir))
        fs_1.default.mkdirSync(cacheDir, { recursive: true });
});
exports.createCacheDir = createCacheDir;
const readCacheManifest = (filePath = exports.defaultCacheFilePath) => {
    try {
        return JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    }
    catch (_) {
        return [];
    }
};
exports.readCacheManifest = readCacheManifest;
const writeCacheManifest = (cacheImages, filePath = exports.defaultCacheFilePath) => {
    fs_1.default.writeFileSync(filePath, JSON.stringify(cacheImages), 'utf-8');
};
exports.writeCacheManifest = writeCacheManifest;
