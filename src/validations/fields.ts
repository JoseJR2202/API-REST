import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const fieldsValidationSignUpEmpleados = [
    check('nombre').exists().withMessage('Debe incluir el nombre del empleado').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    check('telefono').exists().withMessage('Debe incluir el telefono del empleado').isString().isLength({min:11,max:11}).withMessage('Numero invalido'),
    check('contrasena').exists().withMessage('Debe incluir la constraseña del empleado').isString().isLength({ min: 1, max:20 }).withMessage('contraseña invalida'),
  ];
  
  export const fieldsValidationUpdateEmpleados = [
    check('nombre').exists().withMessage('Debe incluir el nombre del empleado').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    check('telefono').exists().withMessage('Debe incluir el telefono del empleado').isString().isLength({min:11,max:11}).withMessage('Numero invalido'),
  ];
  
  export const fieldsValidationLoginEmpleados = [
    check('correo').exists().withMessage('Debe incluir el correo del empleado').isString().isLength({ min: 1 }).withMessage('El correo no puede estar vacio'),
    check('contrasena').exists().withMessage('Debe incluir la constraseña del empleado').isString().isLength({ min: 1, max:20 }).withMessage('contraseña invalida'),
  ];

  export const fieldsValidationProductos=[
    check('nombre').exists().withMessage('Debe incluir el nombre del producto').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    //quizas esta podria no ser necesaria
    check('descripcion').exists().withMessage('Debe incluir una breve descripcion del producto').isString().isLength({ min: 1, max:350 }).withMessage('la descripcion no puede estar vacio'),
    check('precio_compra').exists().withMessage('Debe incluir el precio por el cual se compro el producto al proveedor').isFloat().withMessage('precio invalido'),
    check('precio_venta').exists().withMessage('Debe incluir el precio al cual sera vendido').isFloat().withMessage('precio invalido'),
  ];
  
  export const fieldsValidationProductosNuevo=[
    check('nombre').exists().withMessage('Debe incluir el nombre del producto').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    //quizas esta podria no ser necesaria
    check('descripcion').exists().withMessage('Debe incluir una breve descripcion del producto').isString().isLength({ min: 1, max:350 }).withMessage('la descripcion no puede estar vacio'),
    check('precio_compra').exists().withMessage('Debe incluir el precio por el cual se compro el producto al proveedor').isFloat().withMessage('precio invalido'),
    check('precio_venta').exists().withMessage('Debe incluir el precio al cual sera vendido').isFloat().withMessage('precio invalido'),
    check('id_proveedor').exists().withMessage('Debe incluir el proveedor').isInt().withMessage('no es valido'),
  ];

  export const fieldsValidationProveedores = [
    check('nombre').exists().withMessage('Debe incluir el nombre del proveedor').isString().isLength({ min: 1 }).withMessage('El nombre no puede estar vacio'),
    check('direccion').exists().withMessage('Debe incluir la direccion del proveedor').isString().isLength({ min: 1 }).withMessage('la direccion no puede estar vacia'),
    check('contacto').exists().withMessage('Debe incluir alguna forma para contactarlos'),
  ];
  

  export const checkResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 400,
        message: 'Error en datos enviados',
        error: errors.array()[0],
      });
    } else {
      next();
    }
  };
  