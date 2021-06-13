export var __esModule: boolean;
export var deleteEmpleados: ((id: any) => Promise<boolean>) | undefined;
export var updateEmpleados: (({ emple, ide }: {
    emple: any;
    ide: any;
}) => Promise<{
    id: any;
    nombre: any;
    correo: any;
    telefono: any;
}>) | undefined;
export var getEmpleados_correo: ((nombre: any) => Promise<{
    id: any;
    nombre: any;
    correo: any;
    telefono: any;
    contrasena: any;
}>) | undefined;
export var getEmpleados_id: ((id: any) => Promise<{
    id: any;
    nombre: any;
    correo: any;
    telefono: any;
}>) | undefined;
export var getEmpleados: (() => Promise<any>) | undefined;
//# sourceMappingURL=Empleos.d.ts.map