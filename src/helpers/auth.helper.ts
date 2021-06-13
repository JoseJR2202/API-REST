//Proximos helpers aqui
import Pool from '@utils/pool';
import {querysEmpleados} from '@utils/querys';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { empleadoLogin } from '@interfaces/empleado';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

export const insertEmpleado= async (emp: empleadoLogin): Promise<empleadoLogin> =>{
    const {nombre,correo,telefono,contrasena}= emp;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(contrasena, salt);
        const response= (await client.query(querysEmpleados.SIGN_UP_empleados,[nombre,correo,hashedPassword,telefono])).rows[0];
        const empleados: empleadoLogin= {
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
