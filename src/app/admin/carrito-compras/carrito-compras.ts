import { Productos } from "../productos/productos";

export interface CarritoCompras{
    total: number;
    subtotal: number;
    productos: Array<Productos>;
}