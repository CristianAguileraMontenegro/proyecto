import { Component, OnInit } from '@angular/core';
import {listaArtistas} from '../../interfaces/artistas';
import { Router,ActivatedRoute } from '@angular/router';//nos permite recibir los datos
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ArtistasService} from '../../servicios/artistas.service';

@Component({
  selector: 'app-perfil-publico-view',
  templateUrl: './perfil-publico-view.component.html',
  styleUrls: ['./perfil-publico-view.component.scss']
})
export class PerfilPublicoViewComponent implements OnInit {

  listaArtistas:any;
  artistaRecibido:number = 0;
  artistaActual: any;

  closeResult:string = "";


  flag:boolean =false; //opcupada para la generacion del index y que no genere antes de que carge todo el artista
  imgenUrl:any;
  imagen:any;
  imageInfos:any = [];
  obrasUrl:any;
  almacenadorDeImagenes:Array<any> = [];
  imagenPerfil:any;
  obras:Array<any> = [];


  foto:any
  i:number = 0;
  j:number = 0;


  hayObras:boolean = false;


  opcionDeDispocicionSeleccionada:any;


  constructor(private ruta:ActivatedRoute, private servicioImagenes:ImagenesService, private servicioArtistas:ArtistasService) {
    this.ruta.params.subscribe(datos=>{
      this.artistaRecibido=datos["id"];
    });
   }

   ngOnInit(): void {
    
    this.identificarArtistaAMostrar();
  }

  identificarArtistaAMostrar(){  
    this.obtenerImagenesPerfil();
    this.obtenerArtista();
      
    



    
      
    
    /*for(let i = 0; i <  this.artistaActual.obrasArtista.length; i++)
    {
      this.hayObras = true;
      this.almacenadorDeImagenes.push(this.artistaActual.obrasArtista[i].url);
      
      let reader = new FileReader();
      reader.readAsDataURL( this.artistaActual.obrasArtista[i].archivo); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
      reader.onload = () =>{
        
      }
    }
    
    
    let reader = new FileReader();
    reader.readAsDataURL(this.artistaActual.fotoDePerfil); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
    reader.onload = () =>{
      this.imgenUrl = reader.result;
    }*/
  }

  //--------------------------Imagnes------------------------------
  obtenerObrasDeArtista(id: number){
    this.servicioImagenes.consultarObrasTabla(id).subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
        this.obras.push(Observador[i]);
       
      }
      this.mostrarObras();
    })
  }

  mostrarObras(){
    this.servicioImagenes.getObrasFolder().subscribe(Observador=>{
      this.artistaActual.obrasArtista = this.obras;
      for (let i = 0; i <  this.obras.length; i++) {
        for (let j = 0; j < Observador.length; j++ )
        {
          if(Observador[j].name == this.obras[i].ulr)
          {
            this.almacenadorDeImagenes.push({url:Observador[j].url,nombre:Observador[j].name});
            this.hayObras = true;
          }
        }
      }
       this.i = this.almacenadorDeImagenes.length;
    });
  }

  obtenerImagenesPerfil(){
    this.servicioImagenes.getImagenPerfilFolder().subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
       
        this.imageInfos.push(Observador[i]);   
      }
    });
  }  

  obtenerArtista(){
    this.servicioArtistas.consultarArtistaEspecifco(this.artistaRecibido).subscribe(Observador=>{
        
      console.log("llegue");
      let flag:boolean = true;
      
      
      for (let j = 0; j < this.imageInfos.length && flag; j++) {
          
        console.log("hola"+j);
        if(this.imageInfos[j].name == Observador[0].fotoDePerfilULR){
            
            flag = false;
            this.artistaActual = {id:Observador[0].id_Artistas, nombreReal:Observador[0].nombreReal, nombreArtista:Observador[0].nombreArtista, correo:Observador[0].correo, contrasena:Observador[0].contrasena, 
            nacionalidad:Observador[0].nacionalidad, descripcion:Observador[0].descripcion, obrasArtista:[],fotoDePerfilULR:this.imageInfos[j].url ,tipoDeDisplay:Observador[0].tipoDeDisplaytipoDeDisplay}

            this.listaArtistas = this.servicioArtistas.consultarArtista();
            this.obtenerObrasDeArtista(this.artistaRecibido);
            console.log("el artista actual");
            console.log(this.artistaActual)
        }
      }

      this.flag = true;
    });
  }

  

}