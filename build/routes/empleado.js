"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleados_helper_1 = require("@helpers/empleados.helper");
const auth_helper_1 = require("@helpers/auth.helper");
const fields_1 = require("@validations/fields");
const router = express_1.Router();
router.get('/', async (req, res) => {
    try {
        const data = await empleados_helper_1.getEmpleados();
        res.status(200).json({ status: 200, usuarios: data, message: 'Lista de empleados enviada!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener los empleados' });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await empleados_helper_1.getEmpleadosId(+id);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado obtenido!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al obtener al empleado' });
    }
});
router.post('/registrar', fields_1.fieldsValidationSignUpEmpleados, fields_1.checkResult, async (req, res) => {
    try {
        const data = await auth_helper_1.insertEmpleado(req.body);
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado agregado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar al empleado' });
    }
});
router.put('/:id', fields_1.fieldsValidationUpdateEmpleados, fields_1.checkResult, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await empleados_helper_1.updateEmpleados({ emple: req.body, ide: +id });
        res.status(200).json({ status: 200, usuarios: data, message: 'Empleado actualizado!' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar al empleado' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await empleados_helper_1.deleteEmpleados(+id);
        res.status(200).json({ status: 200, message: data ? 'Empleado eliminado!' : 'no se ha eliminado ningun empleado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar al empleado' });
    }
});
exports.default = router;
//# sourceMappingURL=empleado.js.map