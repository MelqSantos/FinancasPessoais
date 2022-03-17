import { Transacao } from "./Transacao";

export class Categoria{
    public id: number;
    public descricao: string;

    // Relacionamentos
    public transacao: Transacao[];
}