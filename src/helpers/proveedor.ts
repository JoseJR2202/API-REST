import Pool from '@utils/pool';
import {querys_proveedor} from '@utils/querys';
import { Proveedor } from '@interfaces/Proveedor';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//agregar un proveedor
export const insertProveedor= async (prov: Proveedor): Promise<Proveedor> =>{
    const {nombre,contacto,direccion}= prov;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_proveedor.SIGN_UP_proveedor,[nombre,contacto,direccion])).rows[0];
        const proveedor: Proveedor= {
            id:response.id_producto,
            nombre:response.nombre,
            contacto:response.contacto,
            direccion:response.direccion
        };
        await client.query('COMMIT');
        return proveedor;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}

//obtener la lista de Proveedor
export const getProveedores= async (): Promise<Proveedor[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_proveedor.GET_proveedor)).rows;
        const proveedor: Proveedor[]= response.map((rows)=>{
            return{
                id:rows.id_proveedor,
                nombre:rows.nombre,
                contacto:rows.contacto,
                direccion:rows.direccion
            }
        })
        return proveedor;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//obtener Proveedor por su id
export const getProveedor_id= async ( id: number ): Promise<Proveedor> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_proveedor.GET_proveedor_BY_ID,[id])).rows[0];
        const proveedor: Proveedor= {
                id:response.id_proveedor,
                nombre:response.nombre,
                contacto:response.contacto,
                direccion:response.direccion
        }
        return proveedor;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//actualizar Proveedor
export const updateProveedor= async ({ prov, ide }: { prov: Proveedor; ide: number }): Promise<Proveedor> =>{
    const {nombre,contacto,direccion}= prov;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_proveedor.UPDATE_proveedor,[nombre,contacto,direccion,ide])).rows[0];
        const empleados: Proveedor= {
                id:response.id_proveedor,
                nombre:response.nombre,
                contacto:response.contacto,
                direccion:response.direccion
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

//Borrar Proveedor... por alguna razon...
export const deleteProveedor= async ( id: number ): Promise<boolean> =>{
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_proveedor.DELETE_proveedor,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}