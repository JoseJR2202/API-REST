"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_1 = __importDefault(require("./empleado"));
const producto_1 = __importDefault(require("./producto"));
const proveedor_1 = __importDefault(require("./proveedor"));
const router = express_1.Router();
router.use('/empleados', empleado_1.default);
router.use('/producto', producto_1.default);
router.use('/proveedores', proveedor_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map