"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoFilter = exports.diskStorage = void 0;
const multer = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
exports.diskStorage = (type) => multer.diskStorage({
    destination: (req, file, cb) => {
        const saveTo = path_1.default.join(process.env.STORAGE_DIR || '/', type);
        if (!fs_1.default.existsSync(saveTo))
            fs_1.default.mkdirSync(saveTo, { recursive: true });
        cb(null, saveTo);
    },
    filename: (req, file, cb) => {
        const hex = crypto_1.default.randomBytes(16);
        cb(null, 1 + hex.toString('hex') + '.png');
    },
});
exports.photoFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, false);
    }
    cb(null, true);
};
//# sourceMappingURL=multer.js.map