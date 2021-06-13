"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProveedor = exports.updateProveedor = exports.getProveedor_id = exports.getProveedores = exports.insertProveedor = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const querys_1 = require("@utils/querys");
const pool = pool_1.default.getInstance();
//agregar un proveedor
exports.insertProveedor = async (prov) => {
    const { nombre, contacto, direccion } = prov;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProveedor.SIGN_UP_proveedor, [nombre, contacto, direccion])).rows[0];
        const proveedor = {
            id: response.id_producto,
            nombre: response.nombre,
            contacto: response.contacto,
            direccion: response.direccion
        };
        await client.query('COMMIT');
        return proveedor;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener la lista de Proveedor
exports.getProveedores = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querysProveedor.GET_proveedor)).rows;
        const proveedor = response.map((rows) => {
            return {
                id: rows.id_proveedor,
                nombre: rows.nombre,
                contacto: rows.contacto,
                direccion: rows.direccion
            };
        });
        return proveedor;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener Proveedor por su id
exports.getProveedor_id = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querysProveedor.GET_proveedor_BY_ID, [id])).rows[0];
        const proveedor = {
            id: response.id_proveedor,
            nombre: response.nombre,
            contacto: response.contacto,
            direccion: response.direccion
        };
        return proveedor;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//actualizar Proveedor
exports.updateProveedor = async ({ prov, ide }) => {
    const { nombre, contacto, direccion } = prov;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProveedor.UPDATE_proveedor, [nombre, contacto, direccion, ide])).rows[0];
        const empleados = {
            id: response.id_proveedor,
            nombre: response.nombre,
            contacto: response.contacto,
            direccion: response.direccion
        };
        await client.query('COMMIT');
        return empleados;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
//Borrar Proveedor... por alguna razon...
exports.deleteProveedor = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querysProveedor.DELETE_proveedor, [id])).rowCount > 0;
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
//# sourceMappingURL=proveedor.helper.js.map