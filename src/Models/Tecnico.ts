import { Usuario} from './Usuario';
import { Categoria } from './Categoria';
import { Servicio } from './Servicio';

export class Tecnico {
    tecnicoid: number;
    nombre: string;
    correo: string;
    clave: string;
    direccion: string;
    sobreMi: string;
    rankingid: number;
    presupuesto: number;
    categoriaid: number;
    usuarioid: number;
    fechaInicio: string;
    fechaFinal: string;
    path: string;
    telefono: string;

    usuario: Usuario;
    categoria: Categoria;
    servicio: Servicio;

}
