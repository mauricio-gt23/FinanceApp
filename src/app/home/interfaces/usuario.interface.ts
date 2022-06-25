export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    correo: string;
    contrasena?: string;
}