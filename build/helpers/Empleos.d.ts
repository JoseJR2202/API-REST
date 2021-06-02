import { Empleados, EmpleadosLogin } from '@interfaces/Empleado';
export declare const insertEmpleado: (emp: EmpleadosLogin) => Promise<EmpleadosLogin>;
export declare const getEmpleados: () => Promise<Empleados[]>;
export declare const getEmpleados_id: (id: number) => Promise<Empleados>;
export declare const getEmpleados_name: (nombre: string) => Promise<Empleados>;
export declare const updateEmpleados: ({ emple, ide }: {
    emple: Empleados;
    ide: number;
}) => Promise<Empleados>;
export declare const deleteEmpleados: (id: number) => Promise<boolean>;
//# sourceMappingURL=Empleos.d.ts.map