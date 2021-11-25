import { Component, OnInit } from '@angular/core';
import {IntegranteTeam} from '../../interfaces/integrante-team';
import {listaArtistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras';
import {AdminService} from '../../servicios/admin.service';
import {adminPrueba} from '../../interfaces/admin';
import {ArtistasService} from '../../servicios/artistas.service';
import {ImagenesService} from '../../servicios/imagenes.service';
import { IntegrantesService } from '../../servicios/integrantes.service';
import {NoticiasService} from '../../servicios/noticias.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  artistas:any = listaArtistas;
  imageInfos:Array<any> = [];
  filterArtista ='';
  obras:Array<any> = [];
  imagenesIntegrantes:Array<any> = [];
  listaDeNoticias:any = [];
  imagenesNoticias:Array<any> = [];
  arregloDeTeam:any = [];

  constructor(private servicioAdmin:AdminService, private servicioArtista:ArtistasService, private servicioImagenes:ImagenesService, private router:Router, private servicioIntegrante:IntegrantesService, private servicioNoticia:NoticiasService) {
    

    
  }

  ngOnInit(): void {
    
    listaArtistas.length = 0; //de esta manera evitamos que lista artistas guarde los mismos artistas cada ves que se recargue la pagina
    this.artistas = listaArtistas;
    this.arregloDeTeam.length = 0;
    this.listaDeNoticias.length = 0;
    this.imageInfos = [];
    this.filterArtista = '';
    this.obras = [];
    this.obtenerAdmin();
    this.obtenerImagenesPerfilFolder();
    this.obtenerArtistas();
    this.obtenerImagenesIntegrantes();
    this.obtenerIntegrantes();
    this.obtenerImagenesNoticias();
    this.obtenerNoticias();
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

  obtenerImagenesIntegrantes(){
    this.servicioIntegrante.getIntegranteEnFolder().subscribe(Observador =>{

      for(let i = 0; i < Observador.length; i++)
      {
        this.imagenesIntegrantes.push(Observador[i]);
      }

        
    });
  }

  obtenerIntegrantes(){
    this.servicioIntegrante.consultarIntegrantes().subscribe(Observador =>{

      
      for (let i = 0; i < Observador.length; i++) {
        
        
        for(let j = 0; j < this.imagenesIntegrantes.length; j++)
        {
          
          if (this.imagenesIntegrantes[j].name == Observador[i].imagen) {
             this.arregloDeTeam.push({id:Observador[i].id, nombre:Observador[i].nombre, cargo:Observador[i].cargo, descripcion:Observador[i].descripcion, imagen:this.imagenesIntegrantes[j].url});
             console.log(this.arregloDeTeam);
          }
         
        }
        
      }
    });
  }

  obtenerImagenesNoticias(){
    this.servicioNoticia.getNoticiasFolder().subscribe(Observador =>{
      for(let i = 0; i < Observador.length; i++)
      {
        this.imagenesNoticias.push(Observador[i]);
      }
    });
  }

  obtenerNoticias(){
 
    this.servicioNoticia.consultarNoticias().subscribe(Observador =>{
        for (let i = 0; i < Observador.length; i++) {
          
          
          for(let j = 0; j < this.imagenesNoticias.length; j++)
          {
            
            
            if (this.imagenesNoticias[j].name == Observador[i].imagenURL) {
              this.listaDeNoticias.push({titulo:Observador[i].titulo, texto:Observador[i].texto, id:Observador[i].id, imagenURL:this.imagenesNoticias[j].url});
              
            }
          
          }
        }
        console.log(this.listaDeNoticias);
    });
  }

  irARuta(idArtistaBuscado:any){
    this.router.navigate(['/perfilPublico',idArtistaBuscado]);
  }

}