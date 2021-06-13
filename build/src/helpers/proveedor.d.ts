import { proveedor } from '@interfaces/proveedor';
export declare const insertProveedor: (prov: proveedor) => Promise<proveedor>;
export declare const getProveedores: () => Promise<proveedor[]>;
export declare const getProveedor_id: (id: number) => Promise<proveedor>;
export declare const updateProveedor: ({ prov, ide }: {
    prov: proveedor;
    ide: number;
}) => Promise<proveedor>;
export declare const deleteProveedor: (id: number) => Promise<boolean>;
//# sourceMappingURL=proveedor.d.ts.map