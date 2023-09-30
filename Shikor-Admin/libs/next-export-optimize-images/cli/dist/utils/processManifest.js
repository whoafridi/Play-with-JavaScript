"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processManifest = (manifestJson) => manifestJson
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line));
exports.default = processManifest;
