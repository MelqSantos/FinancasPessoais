import { Transacao } from "./Transacao";

export class Usuario{
    public id: number;
    public nome: string;
    public email: string;
    public senha: string;

    // Relacionamentos
    public transacao: Transacao[];
}