import { productoDetalles, productoNuevo } from '@interfaces/producto';
export declare const insertProducto: (product: productoNuevo) => Promise<productoNuevo>;
export declare const getProductos: () => Promise<productoDetalles[]>;
export declare const getProductos_ID: (id: number) => Promise<productoDetalles>;
export declare const updateProductos: ({ product, ide }: {
    product: productoNuevo;
    ide: number;
}) => Promise<productoNuevo>;
export declare const deleteProducto: (id: number) => Promise<boolean>;
//# sourceMappingURL=producto.helper.d.ts.map