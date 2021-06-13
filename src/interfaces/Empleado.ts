export interface empleado {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
  }
  
  export interface empleadoLogin extends empleado {
    contrasena: string;
  }
  