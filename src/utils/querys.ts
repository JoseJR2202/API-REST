//queries de la BD
//seran divididas por entidad, en este caso 4 entidades: Empleados, Proveedor, Producto, producto_proveedor
//Posiblen cambien mas adelante
const querys_empleados = {
    GET_empleados: `SELECT * FROM empleados`,
    GET_empleados_BY_ID: `SELECT * FROM empleados WHERE id_empleados = $1`,
    GET_empleados_BY_CORREO: `SELECT * FROM empleados WHERE correo = $1`,
    SIGN_UP_empleados: `INSERT INTO empleados (nombre, correo, contrasena, telefono) VALUES ($1, $2,$3,$4) RETURNING *`,
    UPDATE_empleados: `UPDATE empleados SET nombre = $1, correo = $2, telefono= $3 where id_empleados = $4 RETURNING *`,
    DELETE_empleados: `DELETE FROM empleados WHERE id_empleados = $1`,
  };

  const querys_producto = {
    GET_producto: `SELECT producto.*, proveedor.nombre as nombre_proveedor FROM producto, proveedor where producto.id_proveedor=proveedor.id_proveedor `,
    GET_producto_BY_ID: `SELECT * FROM producto WHERE id_producto  = $1`,
    SIGN_UP_producto: `INSERT INTO producto (nombre, descripcion,precio_compra,precio_venta,id_proveedor) VALUES ($1, $2,$3,$4,$5) RETURNING *`,
    UPDATE_producto: `UPDATE producto SET nombre = $1, descripcion = $2,precio_compra=$3, precio_venta=$4 where id_producto = $5 RETURNING *`,
    DELETE_producto: `DELETE FROM producto WHERE id_producto = $1`,
  };
  
  const querys_proveedor = {
    GET_proveedor: `SELECT * FROM proveedor `,
    GET_proveedor_BY_ID: `SELECT * FROM proveedor WHERE id_proveedor  = $1`,
    SIGN_UP_proveedor: `INSERT INTO proveedor (nombre, contacto, direccion) VALUES ($1, $2,$3) RETURNING *`,
    UPDATE_proveedor: `UPDATE proveedor SET nombre = $1, contacto = $2, direccion=$3 where id_proveedor = $4 RETURNING *`,
    DELETE_proveedor: `DELETE FROM proveedor WHERE id_proveedor = $1`,
  };

//quizas sea mas conveniente agregar el export a cada const previo
  export {querys_empleados,querys_producto,querys_proveedor };
  