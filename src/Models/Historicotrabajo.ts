import { Cliente } from './Cliente';
import { Tecnico } from './Tecnico';
import { Maestroranking } from './Maestroranking';

export class Historicotrabajo {
    historicoid: number;
    clienteid: number;
    tecnicoid: number;
    descripcion: string;
    precio: number;
    rankingid: number;
    estado: number;

    ranking: Maestroranking;
    cliente: Cliente;
    tecnico: Tecnico;
}
