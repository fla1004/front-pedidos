import { Productos } from "../productos";

export interface DetalleVenta{
    productos: Array<Productos>;
    total: number;
}