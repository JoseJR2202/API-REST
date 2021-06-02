import { Proveedor } from '@interfaces/Proveedor';
export declare const insertProveedor: (prov: Proveedor) => Promise<Proveedor>;
export declare const getProveedores: () => Promise<Proveedor[]>;
export declare const getProveedor_id: (id: number) => Promise<Proveedor>;
export declare const getProveedor_name: (nombre: string) => Promise<Proveedor>;
export declare const updateProveedor: ({ prov, ide }: {
    prov: Proveedor;
    ide: number;
}) => Promise<Proveedor>;
export declare const deleteProveedor: (id: number) => Promise<boolean>;
//# sourceMappingURL=proveedor.d.ts.map