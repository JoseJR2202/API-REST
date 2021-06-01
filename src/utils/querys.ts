//queries de la BD
//seran divididas por entidad, en este caso 4 entidades: Empleados, Proveedor, Producto, producto_proveedor
//Posiblen cambien mas adelante
const querys_empleados = {
    GET_empleados: `SELECT * FROM empleados`,
    GET_empleados_BY_ID: `SELECT * FROM empleados WHERE id_empleados = $1`,
    GET_empleados_BY_NAME: `SELECT * FROM empleados WHERE nombre = $1`,
    SIGN_UP_empleados: `INSERT INTO empleados (id_empleados,nombre, correo) VALUES ($1, $2, $3) RETURNING *`,
    UPDATE_empleados: `UPDATE empleados SET id_empleados = $1, nombre = $2, correo = $3`,
    DELETE_empleados: `DELETE FROM empleados WHERE id_empleados = $1`,
  };

  const querys_producto = {
    GET_producto: `SELECT * FROM producto `,
    GET_producto_BY_ID: `SELECT * FROM producto WHERE id_producto  = $1`,
    GET_producto_BY_NAME: `SELECT * FROM producto WHERE nombre = $1`,
    SIGN_UP_producto: `INSERT INTO producto (id_producto ,nombre, descripcion) VALUES ($1, $2, $3) RETURNING *`,
    UPDATE_producto: `UPDATE producto SET id_producto = $1, nombre = $2, descripcion = $3`,
    DELETE_producto: `DELETE FROM producto WHERE id_producto = $1`,
  };
  
  const querys_proveedor = {
    GET_proveedor: `SELECT * FROM proveedor `,
    GET_proveedor_BY_ID: `SELECT * FROM proveedor WHERE id_proveedor  = $1`,
    GET_proveedor_BY_NAME: `SELECT * FROM proveedor WHERE nombre = $1`,
    SIGN_UP_proveedor: `INSERT INTO proveedor (id_proveedor ,nombre, correo) VALUES ($1, $2, $3) RETURNING *`,
    UPDATE_proveedor: `UPDATE proveedor SET id_proveedor = $1, nombre = $2, correo = $3`,
    DELETE_proveedor: `DELETE FROM proveedor WHERE id_proveedor = $1`,
  };

  // Luego la realizo...
//   const querys_proveedor_producto = {
//     GET_proveedor_producto: `SELECT * FROM proveedor `,
//     GET_proveedor_producto_BY_ID: `SELECT * FROM proveedor WHERE id_proveedor  = $1`,
//     GET_proveedor_producto_BY_NAME: `SELECT * FROM proveedor WHERE nombre = $1`,
//     SIGN_UP_proveedor_producto: `INSERT INTO proveedor (id_proveedor ,nombre, correo) VALUES ($1, $2, $3) RETURNING *`,
//     UPDATE_proveedor_producto: `UPDATE proveedor SET id_proveedor = $1, nombre = $2, correo = $3`,
//     DELETE_proveedor_producto: `DELETE FROM proveedor WHERE id_proveedor = $1`,
//   };

//quizas sea mas conveniente agregar el export a cada const previo
  export {querys_empleados,querys_producto,querys_proveedor };
  