"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@helpers/auth");
const passport_1 = require("passport");
const fields_1 = require("@validations/fields");
const strategies_1 = require("@utils/strategies");
const auth_2 = require("@validations/auth");
const router = express_1.Router();
router.get('/logout', auth_2.isAuth, (req, res) => {
    req.logout();
    res.json({ status: 200, message: 'Sesión finalizada.' });
});
router.post('/registrar', auth_2.isLogged, fields_1.FieldsValidation_signUpEmpleados, fields_1.checkResult, async (req, res) => {
    try {
        const data = await auth_1.insertEmpleado(req.body);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado agregado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al registrar al empleado' });
    }
});
router.post('/ingresar', auth_2.isLogged, fields_1.FieldsValidation_loginEmpleados, fields_1.checkResult, passport_1.authenticate('local'), async (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Inicio de sesion exitoso',
        usuario: req.user,
        token: strategies_1.generateToken(req.user),
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map