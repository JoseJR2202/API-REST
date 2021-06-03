import { Router } from 'express';
import { insertEmpleado } from '@helpers/auth';
import { authenticate } from 'passport';
import {FieldsValidation_loginEmpleados,FieldsValidation_signUpEmpleados,checkResult} from '@validations/fields'
import { generateToken } from '@utils/strategies';
import { isLogged, isAuth } from '@validations/auth';

const router = Router();

router.get('/logout', isAuth, (req: any, res) => {
    req.logout();
    res.json({ status: 200, message: 'Sesión finalizada.' });
});

router.post('/registrar',isLogged,FieldsValidation_signUpEmpleados,checkResult,async(req,res)=>{
    try {
        const data = await insertEmpleado(req.body);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado agregado!' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al registrar al empleado' });
    }
});

router.post('/ingresar', isLogged,FieldsValidation_loginEmpleados, checkResult, authenticate('local'), async (req: any, res) => {
    res.status(200).json({
    status: 200,
    message: 'Inicio de sesion exitoso',
    usuario: req.user,
    token: generateToken(req.user),
    });
  });
  
  export default router;