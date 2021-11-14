import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultadoArtista = [];

    for(const artista of value){
      if(artista.nombreArtista.indexOf(arg) > -1){
        resultadoArtista.push(artista);
      }
    }
    return resultadoArtista;
  }
}
