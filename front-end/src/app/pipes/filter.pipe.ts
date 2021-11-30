import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: string): any {

    if(arg === '' || arg.length < 3) return value;
    const resultadoArtista = [];

    for(const artista of value){
      if(artista.nombreArtista.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultadoArtista.push(artista);
      }
    }
    return resultadoArtista;
  }
}
