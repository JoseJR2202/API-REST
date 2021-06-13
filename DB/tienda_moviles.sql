CREATE TABLE "proveedor" (
  "id_proveedor" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "direccion" varchar,
  "contacto" varchar
);

CREATE TABLE "producto" (
  "id_producto" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "descripcion" varchar,
  "precio_compra" numeric,
  "precio_venta" numeric,
  "id_proveedor" integer
);

CREATE TABLE "empleado" (
  "id_empleado" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "correo" varchar,
  "contrasena" varchar,
  "telefono" varchar
);

ALTER TABLE "producto" ADD FOREIGN KEY ("id_proveedor") REFERENCES "proveedor" ("id_proveedor") 
on delete set null 
on update cascade;

ALTER TABLE empleados
ADD CONSTRAINT unico_correo UNIQUE (correo);
