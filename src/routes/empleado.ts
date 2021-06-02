import { Router } from 'express';
import { getEmpleados,getEmpleados_id,getEmpleados_name,deleteEmpleados,updateEmpleados,insertEmpleado } from '@helpers/Empleos';

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const data = await getEmpleados();
        res.status(200).json({ status: 200, usuarios: data, message: 'Lista de empleados enviada!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los empleados' });
    }
});

router.get('/:id', async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await getEmpleados_id(+id);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado obtenido!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener al empleado' });
    }
});

router.get('/buscar/:name', async(req,res)=>{
    const {name}=req.params;
    try {
        const data = await getEmpleados_name(name);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado obtenido!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener al empleado' });
    }
});

router.post('/registrar',async(req,res)=>{
    try {
        const data = await insertEmpleado(req.body);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado agregado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar al empleado' });
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await updateEmpleados({emple: req.body, ide:+id});
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado actualizado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar al empleado' });
    }
});

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data = await deleteEmpleados(+id);
        res.status(200).json({ status: 200, message: data? 'Empleado eliminado!':'no se ha eliminado ningun empleado' });
      } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar al empleado' });
      }
})

export default router;