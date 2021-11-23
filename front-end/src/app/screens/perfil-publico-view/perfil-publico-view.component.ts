import { Component, OnInit } from '@angular/core';
import {listaArtistas} from '../../interfaces/artistas';
import { Router,ActivatedRoute } from '@angular/router';//nos permite recibir los datos

@Component({
  selector: 'app-perfil-publico-view',
  templateUrl: './perfil-publico-view.component.html',
  styleUrls: ['./perfil-publico-view.component.scss']
})
export class PerfilPublicoViewComponent implements OnInit {

  listaDeArtistas = listaArtistas;
  artistaRecibido:number =0;
  artistaActual:any;

  imgenUrl:any;
  imagen:any;
  obrasUrl:any;
  almacenadorDeImagenes:Array<any> = [];
  imagenPerfil:any;

  hayObras:boolean = false;

  constructor(private ruta:ActivatedRoute) {
    this.ruta.params.subscribe(datos=>{
      this.artistaRecibido=datos["id"];
    });
   }

  ngOnInit(): void {
    this.artistaActual= this.listaDeArtistas.find(objeto => objeto.id == this.artistaRecibido);
    console.log(this.artistaActual);

    for(let i = 0; i <  this.artistaActual.obrasArtista.length; i++)
    {
      this.hayObras = true;

      let reader = new FileReader();
      reader.readAsDataURL( this.artistaActual.obrasArtista[i].archivo); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
      reader.onload = () =>{
        this.almacenadorDeImagenes.push(reader.result);
      }
    }


    let reader = new FileReader();
    reader.readAsDataURL(this.artistaActual.fotoDePerfil); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
    reader.onload = () =>{
      this.imgenUrl = reader.result;
    }
  }

}