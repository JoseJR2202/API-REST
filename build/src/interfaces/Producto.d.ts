export interface producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio_compra: number;
    precio_venta: number;
}
export interface productoNuevo extends producto {
    id_proveedor: number;
}
export interface productoDetalles extends producto {
    nombre_proveedor: string;
}
//# sourceMappingURL=Producto.d.ts.map