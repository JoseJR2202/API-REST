"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("@helpers/product");
const router = express_1.Router();
router.get('/', async (req, res) => {
    try {
        const data = await product_1.getProductos();
        res.status(200).json({ status: 200, productos: data, message: 'Lista de productos enviadas enviada!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los productos' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await product_1.getProductos_ID(+id);
        res.status(200).json({ status: 200, producto: data, message: 'Producto obtenido!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el producto' });
    }
});
router.get('/buscar/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const data = await product_1.getProductos_name(name);
        res.status(200).json({ status: 200, producto: data, message: 'Producto obtenido!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el producto' });
    }
});
router.post('/agregar', async (req, res) => {
    try {
        const data = await product_1.insertProducto(req.body);
        res.status(200).json({ status: 200, producto: data, message: 'Producto agregado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Producto' });
    }
});
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await product_1.updateProductos({ product: req.body, ide: +id });
        res.status(200).json({ status: 200, producto: data, message: 'Producto actualizado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Producto' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await product_1.deleteProducto(+id);
        res.status(200).json({ status: 200, message: data ? 'Producto eliminado!' : 'no se ha eliminado ningun Producto' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el producto' });
    }
});
exports.default = router;
//# sourceMappingURL=producto.js.map