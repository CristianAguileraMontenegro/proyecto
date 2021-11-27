import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { Artistas } from '../interfaces/artistas';
import {Obras} from '../interfaces/obras';


@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  private baseUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  consultarArtista():Observable<any>{
    return this.http.get(environment.servidor+"/Artistas");
  }

  consultarArtistaEspecifco(id:number):Observable<any>{
    let objeto:any = {id:id};
    return this.http.get(environment.servidor+"/Artistas/"+id);
  }

  guardarArtistas(artista:Artistas):Observable<any>{
    return this.http.post(environment.servidor+"/GuardarArtistas",artista, this.HttpUploadOptions);
  }

  modificarImagenPerfil(id:number, url:string):Observable<any>{
  

    let objeto:any = {id:id, url:url}
    let ruta:string = "/modificarFotoPerfil/"+id;

    
    return this.http.put(environment.servidor+ruta,objeto, this.HttpUploadOptions);
  }

  modificarTipoDisplay(id:number, tipoDeDisplay:number):Observable<any>{
    
    let objeto:any = {id:id, tipoDeDisplay:tipoDeDisplay}
    let ruta:string = "/modificarTipoDisplay/"+id;

    
    return this.http.put(environment.servidor+ruta,objeto, this.HttpUploadOptions);

    
  }

  mofificarDatos(id:number, correo:string, contrasena:string, nombreReal:string, nombreArtista:string, nacionalidad:string, descripcion:string):Observable<any>{


    let objeto:any = {id:id, correo:correo, contrasena:contrasena, nombreReal:nombreReal, nombreArtista:nombreArtista, nacionalidad:nacionalidad, descripcion:descripcion}
    let ruta:string = "/modificarDatosArtista/"+id;
    console.log(objeto);

    return this.http.put(environment.servidor+ruta,objeto, this.HttpUploadOptions);
  }

  eliminarArtistaEspecifico(id:number):Observable<any>{

    return this.http.delete(environment.servidor+"/EliminarArtista/"+id,this.HttpUploadOptions)
  }

  eliminarObrasArtistaEspecifico(id:number):Observable<any>{ //como son tablas relacionadas es necesario eliminar primero todas las obras

    return this.http.delete(environment.servidor+"/EliminarObrasArtista/"+id,this.HttpUploadOptions)
  }

  eliminarObraEspecifica(id:number, nombre:string):Observable<any>{
    let objeto:any = {id:id,nombre:nombre};
    console.log(nombre);
    return this.http.delete(environment.servidor+"/EliminarObraEspecifica/"+nombre, this.HttpUploadOptions);
  }

  modificarObraEspecifica(obra:Obras):Observable<any>{

    return this.http.put(environment.servidor+"/modificarDatosObra/"+obra.id,obra, this.HttpUploadOptions);
  }

  obtenerNombreObras():Observable<any>{
    return this.http.get(environment.servidor+"/ObtenerNombreObras");
  }

  obtenerNombreObrasArtista(id:number):Observable<any>{

    return this.http.get(environment.servidor+"/ObtenerNombreObrasArtista/"+id, this.HttpUploadOptions)
    
  }
}
