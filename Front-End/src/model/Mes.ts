import { Transacao } from "./Transacao";

export class Mes{
    public id: number;
    public descricao: string;
    
    // Relacionamentos
    public transacao: Transacao[];
}