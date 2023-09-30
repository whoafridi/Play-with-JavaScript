"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig = () => {
    try {
        if (process.env['NODE_ENV'] === 'test')
            return require(`../../${process.env['TEST_CONFIG_PATH']}`);
        return require('../export-images.config');
    }
    catch (_) {
        return {};
    }
};
exports.default = getConfig;
