import { EmpleadosLogin } from '@interfaces/Empleado';
export declare const insertEmpleado: (emp: EmpleadosLogin) => Promise<EmpleadosLogin>;
export declare const comparePassword: (candidate: string, hash: string) => Promise<boolean>;
//# sourceMappingURL=auth.d.ts.map