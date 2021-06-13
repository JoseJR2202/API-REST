import { Router } from 'express';
import {getProductos,getProductos_ID,insertProducto,updateProductos,deleteProducto} from '@helpers/producto.helper'
import {fieldsValidationProductos,fieldsValidationProductosNuevo,checkResult} from '@validations/fields'

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const data = await getProductos();
        res.status(200).json({ status: 200, productos: data, message: 'Lista de productos enviadas enviada!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los productos' });
    }
});

router.get('/:id', async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await getProductos_ID(+id);
        res.status(200).json({ status: 200, producto: data, message: 'Producto obtenido!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el producto' });
    }
});

router.post('/agregar',fieldsValidationProductosNuevo,checkResult,async(req,res)=>{
    try {
        const data = await insertProducto(req.body);
        res.status(200).json({ status: 200, producto: data, message: 'Producto agregado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Producto' });
    }
})

router.put('/:id',fieldsValidationProductos,checkResult,async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await updateProductos({product: req.body, ide:+id});
        res.status(200).json({ status: 200, producto: data, message: 'Producto actualizado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Producto' });
    }
});

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await deleteProducto(+id);
        res.status(200).json({ status: 200, message: data? 'Producto eliminado!':'no se ha eliminado ningun Producto' });
      } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el producto' });
      }
})

export default router;