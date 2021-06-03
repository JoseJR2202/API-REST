"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_1 = __importDefault(require("./empleado"));
const producto_1 = __importDefault(require("./producto"));
const proveedor_1 = __importDefault(require("./proveedor"));
const auth_1 = __importDefault(require("./auth"));
const file_1 = __importDefault(require("./file"));
const auth_2 = require("@validations/auth");
const router = express_1.Router();
router.use('/empleados', auth_2.isAuth, empleado_1.default);
router.use('/producto', auth_2.isAuth, producto_1.default);
router.use('/proveedores', auth_2.isAuth, proveedor_1.default);
router.use('/file', auth_2.isAuth, file_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map