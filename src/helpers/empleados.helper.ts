import Pool from '@utils/pool';
import {querysEmpleados} from '@utils/querys';
import { empleado,empleadoLogin } from '@interfaces/empleado';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//obtener la lista de empleados
export const getEmpleados= async (): Promise<empleado[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysEmpleados.GET_empleados)).rows;
        const empleados: empleado[]= response.map((rows)=>{
            return{
                id:rows.id_empleado,
                nombre:rows.nombre,
                correo:rows.correo,
                telefono:rows.telefono
            }
        })
        return empleados;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//obtener empleado por su id
export const getEmpleadosId= async ( id: number ): Promise<empleado> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysEmpleados.GET_empleados_BY_ID,[id])).rows[0];
        const empleados: empleado= {
                id:response.id_empleado,
                nombre:response.nombre,
                correo:response.correo,
                telefono:response.telefono
        }
        return empleados;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//obtener empleados por su nombres... cuestionable la utilidad de esta
export const getEmpleadosCorreo= async ( nombre: string ): Promise<empleadoLogin> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysEmpleados.GET_empleados_BY_CORREO,[nombre])).rows[0];
        const empleados: empleadoLogin= {
                id:response.id_empleado,
                nombre:response.nombre,
                correo:response.correo,
                telefono:response.telefono,
                contrasena:response.contrasena
        }
        return empleados;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//actualizar empleado
export const updateEmpleados= async ({ emple, ide }: { emple: empleado; ide: number }): Promise<empleado> =>{
    const {nombre,correo,telefono}= emple;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysEmpleados.UPDATE_empleados,[nombre,correo,telefono,ide])).rows[0];
        const empleados: empleado= {
                id:response.id_empleado,
                nombre:response.nombre,
                correo:response.correo,
                telefono:response.telefono
        };
        await client.query('COMMIT');
        return empleados;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}

//Borrar empleados... por alguna razon...
export const deleteEmpleados= async ( id: number ): Promise<boolean> =>{
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysEmpleados.DELETE_empleados,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}