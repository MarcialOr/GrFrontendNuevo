import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any {
    console.log(arreglo);

    if (texto === undefined) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter( item => {
      return item.nombre.toLowerCase()
      .includes( texto );
    });
  }

}
