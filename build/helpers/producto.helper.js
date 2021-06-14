"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProductos = exports.getProductosID = exports.getProductos = exports.insertProducto = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const querys_1 = require("@utils/querys");
const pool = pool_1.default.getInstance();
//agregar un producto
exports.insertProducto = async (product) => {
    const { nombre, descripcion, precioCompra, precioVenta, idProveedor } = product;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProducto.SIGN_UP_producto, [nombre, descripcion, precioCompra, precioVenta, idProveedor])).rows[0];
        const producto = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precioCompra: response.precio_compra,
            precioVenta: response.precio_venta,
            idProveedor: response.id_proveedor
        };
        await client.query('COMMIT');
        return producto;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener lista de productos
exports.getProductos = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querysProducto.GET_producto)).rows;
        const productos = response.map((rows) => {
            return {
                id: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precioCompra: rows.precio_compra,
                precioVenta: rows.precio_venta,
                nombreProveedor: rows.nombre_proveedor
            };
        });
        return productos;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener un producto por su id
exports.getProductosID = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querysProducto.GET_producto_BY_ID, [id])).rows[0];
        const productos = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precioCompra: response.precio_compra,
            precioVenta: response.precio_venta,
            nombreProveedor: response.nombre_proveedor
        };
        return productos;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//actualizar producto
exports.updateProductos = async ({ product, ide }) => {
    const { nombre, descripcion, precioCompra, precioVenta } = product;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProducto.UPDATE_producto, [nombre, descripcion, precioCompra, precioVenta, ide])).rows[0];
        const productos = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precioCompra: response.precio_compra,
            precioVenta: response.precio_venta,
            idProveedor: response.id_proveedor
        };
        await client.query('COMMIT');
        return productos;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
//eliminar producto
exports.deleteProducto = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProducto.DELETE_producto, [id])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
//# sourceMappingURL=producto.helper.js.map