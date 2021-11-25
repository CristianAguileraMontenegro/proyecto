import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import {Noticias} from '../interfaces/noticias'


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  guardarNoticiasEnTabla(noticia:Noticias):Observable<any>{
    return this.http.post(environment.servidor+"/GuardarNoticiasEnTabla",noticia, this.HttpUploadOptions);
  }

  consultarNoticias():Observable<any>{
    return this.http.get(environment.servidor+"/Noticias");
  }

  consultarNoticiaEspecifica(id:number):Observable<any>{
    return this.http.get(environment.servidor+"/NoticiaEspecificas/"+id)
  }

  modificarNoticiaEspecifica(noticia:Noticias):Observable<any>{

    return this.http.put(environment.servidor+"/ModificarNoticia/"+noticia.id,noticia, this.HttpUploadOptions);
  }

  eliminarNoticiaEspicifica(id:number):Observable<any>{

    return this.http.delete(environment.servidor+"/EliminarNoticia/"+id,this.HttpUploadOptions)
  }

  guardarNoticiasEnFolder(obra:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', obra);
    
    return this.http.post( environment.servidor+"/subirNoticia",formData, this.HttpUploadOptions);
  }

  getNoticiasFolder():Observable<any>{
    return this.http.get(environment.servidor+"/ObtenerNoticiasDelFolder");
  }

}
