import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { Artistas } from '../interfaces/artistas';


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
}
