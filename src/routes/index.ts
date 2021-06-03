import { Router } from 'express';
import empleados from './empleado';
import productos from './producto';
import proveedor from './proveedor'
import auth from './auth'
import file from './file'
import { isLogged, isAuth } from '@validations/auth';

const router = Router();

router.use('/empleados', isAuth,empleados);
router.use('/producto',isAuth,productos);
router.use('/proveedores',isAuth,proveedor);
router.use('/file',isAuth,file);
router.use('/auth',auth);

export default router;