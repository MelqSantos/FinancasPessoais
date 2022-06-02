import { Categoria } from "./Categoria";
import { Mes } from "./Mes";
import { Usuario } from "./Usuario";

export class Transacao{
    public id: number;
    public descricao: string;
    public valor: number;
    public tipo: string;
    public data: Date;
    
    // Relacionamentos
    public usuario: Usuario;
    public categoria: Categoria;
    public mes: Mes;
}