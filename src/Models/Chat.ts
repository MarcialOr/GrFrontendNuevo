import { Cliente } from './Cliente';
import { Tecnico } from './Tecnico';

export class Chat {
    chatid: number;
    clienteid: number;
    tecnicoid: number;

    cliente: Cliente;
    tecnico: Tecnico;
}
