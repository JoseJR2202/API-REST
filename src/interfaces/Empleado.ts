export interface Empleados {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
  }
  
  export interface EmpleadosLogin extends Empleados {
    contrasena: string;
  }
  