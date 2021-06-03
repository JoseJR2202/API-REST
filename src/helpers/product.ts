import Pool from '@utils/pool';
import {querys_producto} from '@utils/querys';
import {Producto, Producto_detalles,Producto_nuevo } from '@interfaces/Producto';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//agregar un producto
export const insertProducto= async (product: Producto_nuevo): Promise<Producto_nuevo> =>{
    const {nombre,descripcion,precio_compra,precio_venta,id_proveedor}= product;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_producto.SIGN_UP_producto,[nombre,descripcion,precio_compra,precio_venta,id_proveedor])).rows[0];
        const producto: Producto_nuevo= {
            id:response.id_producto,
            nombre:response.nombre,
            descripcion:response.descripcion,
            precio_compra:response.precio_compra,
            precio_venta:response.precio_venta,
            id_proveedor:response.id_proveedor
        };
        await client.query('COMMIT');
        return producto;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}

//obtener lista de productos
export const getProductos= async (): Promise<Producto_detalles[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_producto.GET_producto)).rows;
        const productos: Producto_detalles[]= response.map((rows)=>{
            return{
                id:rows.id_producto,
                nombre:rows.nombre,
                descripcion:rows.descripcion,
                precio_compra:rows.precio_compra,
                precio_venta:rows.precio_venta,
                nombre_proveedor:rows.nombre_proveedor
            }
        })
        return productos;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//obtener un producto por su id
export const getProductos_ID= async ( id: number ): Promise<Producto_detalles> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querys_producto.GET_producto_BY_ID,[id])).rows[0];
        const productos:Producto_detalles= {
                id:response.id_producto,
                nombre:response.nombre,
                descripcion:response.descripcion,
                precio_compra:response.precio_compra,
                precio_venta:response.precio_venta,
                nombre_proveedor:response.nombre_proveedor
        }
        return productos;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//actualizar producto
export const updateProductos= async ({product, ide }: {product:Producto_nuevo,  ide: number }): Promise<Producto_nuevo> =>{
    const {nombre,descripcion,precio_compra,precio_venta}= product;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_producto.UPDATE_producto,[nombre,descripcion,precio_compra,precio_venta,ide])).rows[0];
        const productos: Producto_nuevo= {
                id:response.id_producto,
                nombre:response.nombre,
                descripcion:response.descripcion,
                precio_compra:response.precio_compra,
                precio_venta:response.precio_venta,
                id_proveedor:response.id_proveedor
        }
        await client.query('COMMIT');
        return productos;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}

//eliminar producto
export const deleteProducto= async ( id: number ): Promise<boolean> =>{
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querys_producto.DELETE_producto,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}