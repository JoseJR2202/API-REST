export var __esModule: boolean;
export var deleteProducto: ((id: any) => Promise<boolean>) | undefined;
export var updateProductos: (({ product, ide }: {
    product: any;
    ide: any;
}) => Promise<{
    id: any;
    nombre: any;
    descripcion: any;
    precio_compra: any;
    precio_venta: any;
    id_proveedor: any;
}>) | undefined;
export var getProductos_ID: ((id: any) => Promise<{
    id: any;
    nombre: any;
    descripcion: any;
    precio_compra: any;
    precio_venta: any;
    nombre_proveedor: any;
}>) | undefined;
export var getProductos: (() => Promise<any>) | undefined;
export var insertProducto: ((product: any) => Promise<{
    id: any;
    nombre: any;
    descripcion: any;
    precio_compra: any;
    precio_venta: any;
    id_proveedor: any;
}>) | undefined;
//# sourceMappingURL=product.d.ts.map