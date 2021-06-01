export interface Empleados {
    id: number;
    nombre: string;
    correo: string;
  }
  
  export interface EmpleadosLogin extends Empleados {
    password: string;
  }
  