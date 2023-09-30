"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'svg'];
const formatValidate = (format) => formats.some((allowedFormat) => allowedFormat === format);
exports.default = formatValidate;
