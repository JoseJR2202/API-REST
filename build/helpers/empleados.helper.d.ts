import { empleado, empleadoLogin } from '@interfaces/empleado';
export declare const getEmpleados: () => Promise<empleado[]>;
export declare const getEmpleados_id: (id: number) => Promise<empleado>;
export declare const getEmpleados_correo: (nombre: string) => Promise<empleadoLogin>;
export declare const updateEmpleados: ({ emple, ide }: {
    emple: empleado;
    ide: number;
}) => Promise<empleado>;
export declare const deleteEmpleados: (id: number) => Promise<boolean>;
//# sourceMappingURL=empleados.helper.d.ts.map