"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProductos = exports.getProductos_name = exports.getProductos_ID = exports.getProductos = exports.insertProducto = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const querys_1 = require("@utils/querys");
const pool = pool_1.default.getInstance();
//agregar un producto
exports.insertProducto = async (product) => {
    const { nombre, descripcion, precio_compra, precio_venta, id_proveedor } = product;
    console.log(nombre, descripcion, precio_compra, precio_venta, id_proveedor);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querys_producto.SIGN_UP_producto, [nombre, descripcion, precio_compra, precio_venta, id_proveedor])).rows[0];
        const producto = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio_compra: response.precio_compra,
            precio_venta: response.precio_venta,
            id_proveedor: response.id_proveedor
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
        const response = (await client.query(querys_1.querys_producto.GET_producto)).rows;
        const productos = response.map((rows) => {
            return {
                id: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precio_compra: rows.precio_compra,
                precio_venta: rows.precio_venta,
                nombre_proveedor: rows.nombre_proveedor
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
exports.getProductos_ID = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querys_producto.GET_producto_BY_ID, [id])).rows[0];
        const productos = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio_compra: response.precio_compra,
            precio_venta: response.precio_venta,
            nombre_proveedor: response.nombre_proveedor
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
//obtener producto por su nombre
exports.getProductos_name = async (name) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querys_producto.GET_producto_BY_NAME, [name])).rows[0];
        const productos = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio_compra: response.precio_compra,
            precio_venta: response.precio_venta,
            nombre_proveedor: response.nombre_proveedor
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
    const { nombre, descripcion, precio_compra, precio_venta } = product;
    const client = await pool.connect();
    console.log(nombre, descripcion, ide);
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querys_producto.UPDATE_producto, [nombre, descripcion, precio_compra, precio_venta, ide])).rows[0];
        const productos = {
            id: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio_compra: response.precio_compra,
            precio_venta: response.precio_venta,
            id_proveedor: response.id_proveedor
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
        const response = (await client.query(querys_1.querys_producto.DELETE_producto, [id])).rowCount > 0;
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
//# sourceMappingURL=product.js.map