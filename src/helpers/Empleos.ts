import Pool from '@utils/pool';
import {querys_empleados} from '@utils/querys';
import { Empleados,EmpleadosLogin } from '@interfaces/Empleado';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//agregar un empleados
export const insertEmpleado= async (emp: EmpleadosLogin): Promise<EmpleadosLogin> =>{
    const {nombre,correo,telefono,contrasena}= emp;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_empleados.SIGN_UP_empleados,[nombre,correo,contrasena,telefono])).rows[0];
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
}

//obtener la lista de empleados
export const getEmpleados= async (): Promise<Empleados[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_empleados.GET_empleados)).rows;
        const empleados: Empleados[]= response.map((rows)=>{
            return{
                id:rows.id_empleados,
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
export const getEmpleados_id= async ( id: number ): Promise<Empleados> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_empleados.GET_empleados_BY_ID,[id])).rows[0];
        const empleados: Empleados= {
                id:response.id_empleados,
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
export const getEmpleados_name= async ( nombre: string ): Promise<Empleados> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_empleados.GET_empleados_BY_NAME,[nombre])).rows[0];
        const empleados: Empleados= {
                id:response.id_empleados,
                nombre:response.nombre,
                correo:response.correo,
                telefono:response.telefono
        }
        return empleados;
        // const empleados: Empleados[]= response.map((rows)=>{
        //     return{
        //         id:rows.id_empleados,
        //         nombre:rows.nombre,
        //         correo:rows.correo
        //     }
        // })
        // return empleados;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//actualizar empleado
export const updateEmpleados= async ({ emple, ide }: { emple: Empleados; ide: number }): Promise<Empleados> =>{
    const {nombre,correo,telefono}= emple;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_empleados.UPDATE_empleados,[nombre,correo,telefono,ide])).rows[0];
        const empleados: Empleados= {
                id:response.id_empleados,
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
        const response= (await client.query(querys_empleados.DELETE_empleados,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}