import { empleadoLogin } from '@interfaces/empleado';
export declare const insertEmpleado: (emp: empleadoLogin) => Promise<empleadoLogin>;
export declare const comparePassword: (candidate: string, hash: string) => Promise<boolean>;
//# sourceMappingURL=auth.d.ts.map