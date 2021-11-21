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

  guardarArtistas(artista:Artistas):Observable<any>{
    console.log(JSON.stringify(artista));
    return this.http.post(environment.servidor+"/GuardarArtistas",artista, this.HttpUploadOptions);
  }
}
