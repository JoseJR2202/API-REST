import Pool from '@utils/pool';
import {querysProveedor} from '@utils/querys';
import { proveedor } from '@interfaces/proveedor';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//agregar un proveedor
export const insertProveedor= async (prov: proveedor): Promise<proveedor> =>{
    const {nombre,contacto,direccion}= prov;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysProveedor.SIGN_UP_proveedor,[nombre,contacto,direccion])).rows[0];
        const proveedor: proveedor= {
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
export const getProveedores= async (): Promise<proveedor[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysProveedor.GET_proveedor)).rows;
        const proveedor: proveedor[]= response.map((rows)=>{
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
export const getProveedorID= async ( id: number ): Promise<proveedor> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysProveedor.GET_proveedor_BY_ID,[id])).rows[0];
        const proveedor: proveedor= {
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
export const updateProveedor= async ({ prov, ide }: { prov: proveedor; ide: number }): Promise<proveedor> =>{
    const {nombre,contacto,direccion}= prov;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysProveedor.UPDATE_proveedor,[nombre,contacto,direccion,ide])).rows[0];
        const empleados: proveedor= {
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
        const response= (await client.query(querysProveedor.DELETE_proveedor,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}