"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_helper_1 = require("@helpers/proveedor.helper");
const fields_1 = require("@validations/fields");
const router = express_1.Router();
router.get('/', async (req, res) => {
    try {
        const data = await proveedor_helper_1.getProveedores();
        res.status(200).json({ status: 200, Proveedor: data, message: 'Lista de Proveedor enviadas!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los Proveedor' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await proveedor_helper_1.getProveedor_id(+id);
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor obtenido!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el Proveedor' });
    }
});
router.post('/agregar', fields_1.fieldsValidationProveedores, fields_1.checkResult, async (req, res) => {
    try {
        const data = await proveedor_helper_1.insertProveedor(req.body);
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor agregado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Proveedor' });
    }
});
router.put('/:id', fields_1.fieldsValidationProveedores, fields_1.checkResult, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await proveedor_helper_1.updateProveedor({ prov: req.body, ide: +id });
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor actualizado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Proveedor' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await proveedor_helper_1.deleteProveedor(+id);
        res.status(200).json({ status: 200, message: data ? 'Proveedor eliminado!' : 'no se ha eliminado ningun Proveedor' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar al Proveedor' });
    }
});
exports.default = router;
//# sourceMappingURL=proveedor.js.map