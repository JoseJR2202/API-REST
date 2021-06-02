export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio_compra: number;
    precio_venta: number;
}
export interface Producto_nuevo extends Producto {
    id_proveedor: number;
}
export interface Producto_detalles extends Producto {
    nombre_proveedor: string;
}
//# sourceMappingURL=Producto.d.ts.map