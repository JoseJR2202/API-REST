"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
const multer_1 = require("@utils/multer");
const router = express_1.Router();
const uploadFile = (req, res, next) => {
    switch (req.params.type) {
        case 'empleados':
            multer({
                storage: multer_1.diskStorage('empleados-perfil'),
                fileFilter: multer_1.photoFilter,
            }).single('file')(req, res, next);
            break;
        case 'productos':
            multer({
                storage: multer_1.diskStorage('productos'),
                fileFilter: multer_1.photoFilter,
            }).single('file')(req, res, next);
            break;
        default:
            res.status(400).json({
                status: 400,
                message: `Los archivo de tipo ${req.params.type} no son validos`,
            });
    }
};
router.post('/:type', uploadFile, async (req, res) => {
    const archivo = req.file;
    res.status(200).json({
        status: 200,
        message: `Archivo de tipo ${req.params.type} subido`,
        archivo,
    });
});
exports.default = router;
//# sourceMappingURL=file.js.map