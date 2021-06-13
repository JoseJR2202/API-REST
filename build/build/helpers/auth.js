"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.insertEmpleado = void 0;
//Proximos helpers aqui
const pool_1 = __importDefault(require("@utils/pool"));
const querys_1 = require("@utils/querys");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
exports.insertEmpleado = async (emp) => {
    const { nombre, correo, telefono, contrasena } = emp;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const salt = bcryptjs_1.genSaltSync(10);
        const hashedPassword = bcryptjs_1.hashSync(contrasena, salt);
        const response = (await client.query(querys_1.querys_empleados.SIGN_UP_empleados, [nombre, correo, hashedPassword, telefono])).rows[0];
        const empleados = {
            id: response.id_empleados,
            nombre: response.nombre,
            correo: response.correo,
            telefono: response.telefono,
            contrasena: response.contrasena
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
exports.comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        bcryptjs_1.compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
//# sourceMappingURL=auth.js.map