import { Usuario } from './Usuario';
import { Maestroranking } from './Maestroranking';

export class Cliente {
    clienteid: number;
    nombre: string;
    correo: string;
    clave: string;
    direccion: string;
    sobremi: string;
    rankingid: number;
    telefono: string;
    path: string;

    usuario: Usuario;
    ranking: Maestroranking;
}
