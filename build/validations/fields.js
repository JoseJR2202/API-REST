"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.FieldsValidation_Proveedores = exports.FieldsValidation_ProductosNuevo = exports.FieldsValidation_Productos = exports.FieldsValidation_loginEmpleados = exports.FieldsValidation_updateEmpleados = exports.FieldsValidation_signUpEmpleados = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.FieldsValidation_signUpEmpleados = [
    express_validator_2.check('nombre').exists().withMessage('Debe incluir el nombre del empleado').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    express_validator_2.check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    express_validator_2.check('telefono').exists().withMessage('Debe incluir el telefono del empleado').isString().isLength({ min: 11, max: 11 }).withMessage('Numero invalido'),
    express_validator_2.check('contrasena').exists().withMessage('Debe incluir la constraseña del empleado').isString().isLength({ min: 1, max: 20 }).withMessage('contraseña invalida'),
];
exports.FieldsValidation_updateEmpleados = [
    express_validator_2.check('nombre').exists().withMessage('Debe incluir el nombre del empleado').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    express_validator_2.check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    express_validator_2.check('telefono').exists().withMessage('Debe incluir el telefono del empleado').isString().isLength({ min: 11, max: 11 }).withMessage('Numero invalido'),
];
exports.FieldsValidation_loginEmpleados = [
    express_validator_2.check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    express_validator_2.check('contrasena').exists().withMessage('Debe incluir la constraseña del empleado').isString().isLength({ min: 1, max: 20 }).withMessage('contraseña invalida'),
];
exports.FieldsValidation_Productos = [
    express_validator_2.check('nombre').exists().withMessage('Debe incluir el nombre del producto').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    //quizas esta podria no ser necesaria
    express_validator_2.check('descripcion').exists().withMessage('Debe incluir una breve descripcion del producto').isString().isLength({ min: 1, max: 350 }).withMessage('la descripcion no puede estar vacio'),
    express_validator_2.check('precio_compra').exists().withMessage('Debe incluir el precio por el cual se compro el producto al proveedor').isFloat().withMessage('precio invalido'),
    express_validator_2.check('precio_venta').exists().withMessage('Debe incluir el precio al cual sera vendido').isFloat().withMessage('precio invalido'),
];
exports.FieldsValidation_ProductosNuevo = [
    express_validator_2.check('nombre').exists().withMessage('Debe incluir el nombre del producto').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    //quizas esta podria no ser necesaria
    express_validator_2.check('descripcion').exists().withMessage('Debe incluir una breve descripcion del producto').isString().isLength({ min: 1, max: 350 }).withMessage('la descripcion no puede estar vacio'),
    express_validator_2.check('precio_compra').exists().withMessage('Debe incluir el precio por el cual se compro el producto al proveedor').isFloat().withMessage('precio invalido'),
    express_validator_2.check('precio_venta').exists().withMessage('Debe incluir el precio al cual sera vendido').isFloat().withMessage('precio invalido'),
    express_validator_2.check('id_proveedor').exists().withMessage('Debe incluir el proveedor').isInt().withMessage('no es valido'),
];
exports.FieldsValidation_Proveedores = [
    express_validator_2.check('nombre').exists().withMessage('Debe incluir el nombre del proveedor').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    express_validator_2.check('direccion').exists().withMessage('Debe incluir la direccion del proveedor').isString().isLength({ min: 1 }).withMessage('la direccion no puede estar vacia'),
    express_validator_2.check('contacto').exists().withMessage('Debe incluir alguna forma para contactarlos'),
];
exports.checkResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: 'Error en datos enviados',
            error: errors.array()[0],
        });
    }
    else {
        next();
    }
};
//# sourceMappingURL=fields.js.map