import Pool from '@utils/pool';
import {querysProducto} from '@utils/querys';
import {producto, productoDetalles,productoNuevo } from '@interfaces/producto';
import { PoolClient } from 'pg';

const pool = Pool.getInstance();

//agregar un producto
export const insertProducto= async (product: productoNuevo): Promise<productoNuevo> =>{
    const {nombre,descripcion,precioCompra,precioVenta,idProveedor}= product;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysProducto.SIGN_UP_producto,[nombre,descripcion,precioCompra,precioVenta,idProveedor])).rows[0];
        const producto: productoNuevo= {
            id:response.id_producto,
            nombre:response.nombre,
            descripcion:response.descripcion,
            precioCompra:response.precio_compra,
            precioVenta:response.precio_venta,
            idProveedor:response.id_proveedor
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
export const getProductos= async (): Promise<productoDetalles[]> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysProducto.GET_producto)).rows;
        const productos:productoDetalles[]= response.map((rows)=>{
            return{
                id:rows.id_producto,
                nombre:rows.nombre,
                descripcion:rows.descripcion,
                precioCompra:rows.precio_compra,
                precioVenta:rows.precio_venta,
                nombreProveedor:rows.nombre_proveedor
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
export const getProductosID= async ( id: number ): Promise<productoDetalles> =>{
    const client: PoolClient = await pool.connect();
    try {
        const response= (await client.query(querysProducto.GET_producto_BY_ID,[id])).rows[0];
        const productos:productoDetalles= {
                id:response.id_producto,
                nombre:response.nombre,
                descripcion:response.descripcion,
                precioCompra:response.precio_compra,
                precioVenta:response.precio_venta,
                nombreProveedor:response.nombre_proveedor
        }
        return productos;
    } catch (e) {
        throw e;
    } finally {
      client.release();
    }
}

//actualizar producto
export const updateProductos= async ({product, ide }: {product:productoNuevo,  ide: number }): Promise<productoNuevo> =>{
    const {nombre,descripcion,precioCompra,precioVenta}= product;
    const client: PoolClient = await pool.connect();
    try {
        await client.query('BEGIN');
        const response= (await client.query(querysProducto.UPDATE_producto,[nombre,descripcion,precioCompra,precioVenta,ide])).rows[0];
        const productos: productoNuevo= {
                id:response.id_producto,
                nombre:response.nombre,
                descripcion:response.descripcion,
                precioCompra:response.precio_compra,
                precioVenta:response.precio_venta,
                idProveedor:response.id_proveedor
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
        const response= (await client.query(querysProducto.DELETE_producto,[id])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
      client.release();
    }
}