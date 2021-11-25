import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import { Obras} from '../interfaces/obras';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  
  private baseUrl = 'http://127.0.0.1:3000';
  constructor(private http: HttpClient) { }

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  //guardar imagenes en folder
  guardarImagenPerfil(imagen:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', imagen);
    
    return this.http.post( `${this.baseUrl}/subirImagenPerfil`,formData, this.HttpUploadOptions);
  }

  guardarObra(obra:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', obra);
    
    return this.http.post( `${this.baseUrl}/subirObras`,formData, this.HttpUploadOptions);
    
  }
  //guardar imagenes en folder


  guardarObraEnTabla(obra:Obras):Observable<any>{
    console.log(obra.idArtista);
    return this.http.post(environment.servidor+"/GuardarObrasEnTabla",obra, this.HttpUploadOptions);
  }

  getImagenPerfilFolder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ObtenerImagenesDePerfilDelFolder`);
  }

  getObrasFolder(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ObtenerObrasDelFolder`);
  }

  consultarObrasTabla(id:number):Observable<any>{
    return this.http.get(environment.servidor+"/ObrasEspecificas/"+id);
  }
}
