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
exports.run = exports.optimizeImages = exports.getOptimizeResult = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const getConfig_1 = __importDefault(require("../utils/getConfig"));
const processManifest_1 = __importDefault(require("../utils/processManifest"));
const cache_1 = require("./utils/cache");
const formatValidate_1 = __importDefault(require("./utils/formatValidate"));
const uniqueItems_1 = __importDefault(require("./utils/uniqueItems"));
const getOptimizeResult = ({ destDir, noCache, cacheImages, cacheDir, cacheMeasurement, nonCacheMeasurement, errorMeasurement, pushInvalidFormatAssets, cliProgressBarIncrement, originalFilePath, output, width, quality, extension, sharpOptions }) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, formatValidate_1.default)(extension)) {
        try {
            const filePath = path_1.default.join(destDir, output);
            if (!fs_1.default.existsSync(filePath))
                fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
            const outputPath = path_1.default.join(cacheDir, output);
            if (!fs_1.default.existsSync(outputPath))
                fs_1.default.mkdirSync(path_1.default.dirname(outputPath), { recursive: true });
            const imageBuffer = fs_1.default.readFileSync(originalFilePath);
            // Cache process
            if (!noCache) {
                const cacheImagesFindIndex = cacheImages.findIndex(cacheImage => cacheImage.output === output);
                const hash = (0, crypto_1.createHash)('sha256')
                    .update(imageBuffer)
                    .digest('hex');
                if (cacheImagesFindIndex === -1) {
                    cacheImages.push({ output, hash });
                }
                else {
                    const currentCacheImage = cacheImages[cacheImagesFindIndex];
                    if ((currentCacheImage === null || currentCacheImage === void 0 ? void 0 : currentCacheImage.hash) === hash) {
                        fs_1.default.copyFileSync(outputPath, filePath);
                        cacheMeasurement();
                        cliProgressBarIncrement();
                        return;
                    }
                    else {
                        if (currentCacheImage !== undefined)
                            currentCacheImage.hash = hash;
                    }
                }
            }
            const image = (0, sharp_1.default)(imageBuffer, { sequentialRead: true, animated: true });
            // image.rotate().resize({ width, withoutEnlargement: true })
            image.rotate().resize({ width });
            switch (extension) {
                case 'jpeg':
                    yield image.jpeg(Object.assign({ quality }, sharpOptions === null || sharpOptions === void 0 ? void 0 : sharpOptions.jpg)).toFile(outputPath);
                    break;
                case 'jpg':
                    yield image.jpeg(Object.assign({ quality }, sharpOptions === null || sharpOptions === void 0 ? void 0 : sharpOptions.jpg)).toFile(outputPath);
                    break;
                case 'png':
                    yield image.png(Object.assign({ quality }, sharpOptions === null || sharpOptions === void 0 ? void 0 : sharpOptions.png)).toFile(outputPath);
                    break;
                case 'webp':
                    yield image
                        .webp(Object.assign({ quality }, sharpOptions === null || sharpOptions === void 0 ? void 0 : sharpOptions.webp))
                        .toFile(outputPath);
                    break;
                case 'svg':
                    yield image
                        .webp(Object.assign({ quality }, sharpOptions === null || sharpOptions === void 0 ? void 0 : sharpOptions.webp))
                        .toFile(outputPath);
                    break;
                // case 'avif':
                //   await image.avif({ quality, ...sharpOptions?.avif }).toFile(outputPath)
                //   break
            }
            fs_1.default.copyFileSync(outputPath, filePath);
            nonCacheMeasurement();
            cliProgressBarIncrement();
        }
        catch (error) {
            console.warn(error);
            cliProgressBarIncrement();
            errorMeasurement();
        }
    }
    else {
        try {
            const filePath = path_1.default.join(destDir, output);
            if (!fs_1.default.existsSync(filePath))
                throw new Error(`Path: ${filePath} doesn't exist`);
            fs_1.default.copyFileSync(originalFilePath, filePath);
            pushInvalidFormatAssets(originalFilePath);
            cliProgressBarIncrement();
        }
        catch (error) {
            console.warn(error);
            cliProgressBarIncrement();
            errorMeasurement();
        }
    }
});
exports.getOptimizeResult = getOptimizeResult;
const cwd = process.cwd();
const optimizeImages = ({ manifestJsonPath, noCache, config, terse = false }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const destDir = path_1.default.resolve(cwd, (_a = config.outDir) !== null && _a !== void 0 ? _a : 'out');
    let manifest;
    try {
        manifest = (0, uniqueItems_1.default)((0, processManifest_1.default)(fs_1.default.readFileSync(manifestJsonPath, 'utf-8')));
    }
    catch (error) {
        throw Error(typeof error === 'string' ? error : 'Unexpected error.');
    }
    // External image if present
    // if (manifest.some(({ externalUrl }) => externalUrl !== undefined)) {
    //   await externalImagesDownloader({ terse, manifest, destDir })
    // }
    if (!terse)
        console.log(`\n- Image Optimization -`);
    let cacheImages = [];
    if (!noCache) {
        yield (0, cache_1.createCacheDir)();
        cacheImages = (0, cache_1.readCacheManifest)();
    }
    const promises = [];
    let measuredCache = 0;
    let measuredNonCache = 0;
    let measuredError = 0;
    const invalidFormatAssets = new Set([]);
    const cacheMeasurement = () => (measuredCache += 1);
    const nonCacheMeasurement = () => (measuredNonCache += 1);
    const errorMeasurement = () => (measuredError += 1);
    const pushInvalidFormatAssets = (asset) => invalidFormatAssets.add(asset);
    for (const item of manifest) {
        const originalFilePath = path_1.default.join(destDir, item.src);
        promises.push((0, exports.getOptimizeResult)(Object.assign({ destDir,
            noCache,
            cacheImages, cacheDir: cache_1.defaultCacheDir, cacheMeasurement,
            nonCacheMeasurement,
            errorMeasurement,
            pushInvalidFormatAssets, cliProgressBarIncrement: terse
                ? () => undefined
                : () => process.stdout.write('.'), originalFilePath, sharpOptions: (_b = config.sharpOptions) !== null && _b !== void 0 ? _b : {} }, item)));
    }
    yield Promise.all(promises);
    if (!noCache) {
        (0, cache_1.writeCacheManifest)(cacheImages);
    }
    if (!terse) {
        // eslint-disable-next-line no-console
        console.log(`\nCache assets: ${measuredCache}, NonCache assets: ${measuredNonCache}, Error assets: ${measuredError}`);
        if (invalidFormatAssets.size !== 0) {
            // eslint-disable-next-line no-console
            console.log(`\nThe following images are in a non-optimized format and a simple copy was applied.\n`, Array.from(invalidFormatAssets).join('\n'));
        }
        // eslint-disable-next-line no-console
        console.log('\nSuccessful optimization!');
    }
});
exports.optimizeImages = optimizeImages;
const run = ({ customManifestJsonPath, noCache = false }) => {
    // eslint-disable-next-line no-console
    console.log('\nnext-export-optimize-images: Optimize images.');
    const config = (0, getConfig_1.default)();
    const manifestJsonPath = path_1.default.resolve(cwd, customManifestJsonPath !== null && customManifestJsonPath !== void 0 ? customManifestJsonPath : '.next/custom-optimized-images.nd.json');
    if (fs_1.default.existsSync(manifestJsonPath))
        (0, exports.optimizeImages)({ manifestJsonPath, noCache, config });
    else {
        // eslint-disable-next-line no-console
        console.log(`\nNo images were found to optimize.
(Maybe you never used the image component.)`);
    }
};
exports.run = run;
