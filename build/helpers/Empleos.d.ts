import { Empleados, EmpleadosLogin } from '@interfaces/Empleado';
export declare const getEmpleados: () => Promise<Empleados[]>;
export declare const getEmpleados_id: (id: number) => Promise<Empleados>;
export declare const getEmpleados_correo: (nombre: string) => Promise<EmpleadosLogin>;
export declare const updateEmpleados: ({ emple, ide }: {
    emple: Empleados;
    ide: number;
}) => Promise<Empleados>;
export declare const deleteEmpleados: (id: number) => Promise<boolean>;
//# sourceMappingURL=Empleos.d.ts.map