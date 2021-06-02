import { Router } from 'express';
import {getProveedores,getProveedor_id,getProveedor_name,insertProveedor,updateProveedor,deleteProveedor} from '@helpers/proveedor'

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const data = await getProveedores();
        res.status(200).json({ status: 200, Proveedor: data, message: 'Lista de Proveedor enviadas!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los Proveedor' });
    }
});

router.get('/:id', async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await getProveedor_id(+id);
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor obtenido!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el Proveedor' });
    }
});

router.get('/buscar/:name', async(req,res)=>{
    const {name}=req.params;
    try {
        const data = await getProveedor_name(name);
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor obtenido!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener el Proveedor' });
    }
});

router.post('/agregar',async(req,res)=>{
    try {
        const data = await insertProveedor(req.body);
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor agregado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Proveedor' });
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await updateProveedor({prov: req.body, ide:+id});
        res.status(200).json({ status: 200, Proveedor: data, message: 'Proveedor actualizado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el Proveedor' });
    }
});

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await deleteProveedor(+id);
        res.status(200).json({ status: 200, message: data? 'Proveedor eliminado!':'no se ha eliminado ningun Proveedor' });
      } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar al Proveedor' });
      }
})

export default router;