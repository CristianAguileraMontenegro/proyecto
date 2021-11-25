import { Component, OnInit } from '@angular/core';
import {IntegranteTeam} from '../../interfaces/integrante-team';
import {listaArtistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras';
import {AdminService} from '../../servicios/admin.service';
import {adminPrueba} from '../../interfaces/admin';
import {ArtistasService} from '../../servicios/artistas.service';
import {ImagenesService} from '../../servicios/imagenes.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public arregloDeTeam: IntegranteTeam[];

  artistas:any = listaArtistas;
  imageInfos:Array<any> = [];
  filterArtista ='';
  obras:Array<any> = [];


  constructor(private servicioAdmin:AdminService, private servicioArtista:ArtistasService, private servicioImagenes:ImagenesService, private router:Router) {
    this.arregloDeTeam = [
      {"id":1,"nombre":"Samel Lalonde","cargo":"Diseñador",
      "descripcion":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "imagen":"6GCOIWKVBZEOZL5TDFMY65TAYQ.jpeg"},
      {"id":2,"nombre":"Ford Scavo","cargo":"Diseñador",
      "descripcion":"dsfskdjfhksjdfhsd",
      "imagen":"model-gdc5d0aad1_1280.jpg"},
      {"id":3,"nombre":"Anitta Ritta","cargo":"Artista",
      "descripcion":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "imagen":"naomi-scott-4k-large-for-desktop-wallpaper-preview.jpeg"},
    ];

    
  }

  ngOnInit(): void {
    
    listaArtistas.length = 0; //de esta manera evitamos que lista artistas guarde los mismos artistas cada ves que se recargue la pagina
    this.artistas = listaArtistas;
    this.imageInfos = [];
    this.filterArtista = '';
    this.obras = [];
    this.obtenerAdmin();
    this.obtenerImagenesPerfilFolder();
    this.obtenerArtistas();
    
  }

  obtenerAdmin(){
    this.servicioAdmin.consultarAdmin().subscribe(Observador=>{
      for (let i = 0; i < Observador.length; i++) 
      {
        adminPrueba.id = Observador[i].id_Admin;
        adminPrueba.correo = Observador[i].correo;
        adminPrueba.contrasena = Observador[i].contraseña;
      }
    });
  }

  obtenerImagenesPerfilFolder(){
    this.servicioImagenes.getImagenPerfilFolder().subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
       
        this.imageInfos.push(Observador[i]); 
        
      }
    })
  }

  obtenerObrasDeArtista(id: number){
    this.servicioImagenes.consultarObrasTabla(id).subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
        this.obras.push(Observador[i]);
      }
    })
  }

  obtenerArtistas(){
    this.servicioArtista.consultarArtista().subscribe(Observador=>{
      let fotoBase:any;
      let flag:boolean = true;
      
      for (let i = 0; i < Observador.length; i++) 
      {
        flag = true;
        for (let j = 0; j < this.imageInfos.length && flag; j++) {
          
          if(this.imageInfos[j].name == Observador[i].fotoDePerfilULR){
              
              fotoBase = this.imageInfos[j].url;
              flag = false;
              
          }
        }

        /*for (let k = 0; k < this.obras.length; k++) {

            if(this.obras[k].id_DelArtista == Observador[i].id)
            {
                obrasBase.push({id:this.obras[k].id, nombre:this.obras[k].nombre, descripcion:this.obras[k].descripcion, ulr:this.obras[k].url})
            }
        }*/
        this.obtenerObrasDeArtista(Observador[i].id_Artistas);

        listaArtistas.push({id:Observador[i].id_Artistas, nombreReal:Observador[i].nombreReal, nombreArtista:Observador[i].nombreArtista, correo:Observador[i].correo, contrasena:Observador[i].contrasena, 
          nacionalidad:Observador[i].nacionalidad, descripcion:Observador[i].descripcion, obrasArtista:this.obras ,fotoDePerfilULR:fotoBase ,tipoDeDisplay:Observador[i].tipoDeDisplaytipoDeDisplay});
        //las obras se asignan tal cual debido a que tiene una tabla aparte y un id de ususario que las identifica, en cambio la imagen de usuario no tiene esa capacidad, por lo tanto se obtienen todas y se busca la que concuerde
        
        
      }


    
    });
  }

  irARuta(idArtistaBuscado:any){
    this.router.navigate(['/perfilPublico',idArtistaBuscado]);
  }

}