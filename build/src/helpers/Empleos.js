"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleados = exports.updateEmpleados = exports.getEmpleados_correo = exports.getEmpleados_id = exports.getEmpleados = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const querys_1 = require("@utils/querys");
const pool = pool_1.default.getInstance();
//obtener la lista de empleados
exports.getEmpleados = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querys_empleados.GET_empleados)).rows;
        const empleados = response.map((rows) => {
            return {
                id: rows.id_empleado,
                nombre: rows.nombre,
                correo: rows.correo,
                telefono: rows.telefono
            };
        });
        return empleados;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener empleado por su id
exports.getEmpleados_id = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querys_empleados.GET_empleados_BY_ID, [id])).rows[0];
        const empleados = {
            id: response.id_empleado,
            nombre: response.nombre,
            correo: response.correo,
            telefono: response.telefono
        };
        return empleados;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//obtener empleados por su nombres... cuestionable la utilidad de esta
exports.getEmpleados_correo = async (nombre) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(querys_1.querys_empleados.GET_empleados_BY_CORREO, [nombre])).rows[0];
        const empleados = {
            id: response.id_empleado,
            nombre: response.nombre,
            correo: response.correo,
            telefono: response.telefono,
            contrasena: response.contrasena
        };
        return empleados;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
//actualizar empleado
exports.updateEmpleados = async ({ emple, ide }) => {
    const { nombre, correo, telefono } = emple;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querys_empleados.UPDATE_empleados, [nombre, correo, telefono, ide])).rows[0];
        const empleados = {
            id: response.id_empleado,
            nombre: response.nombre,
            correo: response.correo,
            telefono: response.telefono
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
//Borrar empleados... por alguna razon...
exports.deleteEmpleados = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(querys_1.querys_empleados.DELETE_empleados, [id])).rowCount > 0;
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
//# sourceMappingURL=Empleos.js.map