export interface producto {
    id: number;
    nombre: string;
    descripcion: string;
    precioCompra:number;
    precioVenta:number;
  }

export interface productoNuevo extends producto{
  idProveedor: number;
}

export interface productoDetalles extends producto{
  nombreProveedor:string;
}