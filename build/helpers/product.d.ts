import { Producto_detalles, Producto_nuevo } from '@interfaces/Producto';
export declare const insertProducto: (product: Producto_nuevo) => Promise<Producto_nuevo>;
export declare const getProductos: () => Promise<Producto_detalles[]>;
export declare const getProductos_ID: (id: number) => Promise<Producto_detalles>;
export declare const updateProductos: ({ product, ide }: {
    product: Producto_nuevo;
    ide: number;
}) => Promise<Producto_nuevo>;
export declare const deleteProducto: (id: number) => Promise<boolean>;
//# sourceMappingURL=product.d.ts.map