//Proximos helpers aqui
import Pool from '@utils/pool';
import {querys_empleados} from '@utils/querys';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { EmpleadosLogin } from '@interfaces/Empleado';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

export const insertEmpleado= async (emp: EmpleadosLogin): Promise<EmpleadosLogin> =>{
    const {nombre,correo,telefono,contrasena}= emp;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(contrasena, salt);
        const response= (await client.query(querys_empleados.SIGN_UP_empleados,[nombre,correo,hashedPassword,telefono])).rows[0];
        const empleados: EmpleadosLogin= {
            id:response.id_empleados,
            nombre:response.nombre,
            correo:response.correo,
            telefono:response.telefono,
            contrasena:response.contrasena
    };
        await client.query('COMMIT');
        return empleados;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
};

export const comparePassword = (candidate: string, hash: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};
