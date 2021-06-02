import { Router } from 'express';
import empleados from './empleado';
import productos from './producto';
import proveedor from './proveedor'

const router = Router();

router.use('/empleados', empleados);
router.use('/producto',productos);
router.use('/proveedores',proveedor);

export default router;