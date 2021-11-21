import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { Artistas } from '../interfaces/artistas';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  
  private baseUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  guardarImagenPerfil(imagen:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', imagen);
    console.log("hola");
    return this.http.post( `${this.baseUrl}/subirImagenPerfil`,formData, this.HttpUploadOptions);
  }

  guardarObra(obra:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', obra);

    return this.http.post( `${this.baseUrl}/subirObras`,formData, this.HttpUploadOptions);
    
  }

  getImagenPerfil(): Observable<any> {
    return this.http.get(`${this.baseUrl}/imagenPerfilArtista`);
  }

  getObras(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obrasArtista`);
  }
}
