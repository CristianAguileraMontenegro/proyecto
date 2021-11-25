import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import {IntegranteTeam} from '../interfaces/integrante-team'

@Injectable({
  providedIn: 'root'
})
export class IntegrantesService {

  constructor(private http: HttpClient) { }

  HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' }),
  };

  guardarIntegranteEnTabla(integrante:IntegranteTeam):Observable<any>{
    return this.http.post(environment.servidor+"/GuardarIntegranteEnTabla",integrante, this.HttpUploadOptions);
  }

  consultarIntegrantes():Observable<any>{
    return this.http.get(environment.servidor+"/Integrante");
  }

  consultarIntegranteEspecifico(id:number):Observable<any>{
    return this.http.get(environment.servidor+"/IntegranteEspecifico/"+id)
  }

  modificarIntegranteEspecifico(integrante:IntegranteTeam):Observable<any>{

    return this.http.put(environment.servidor+"/ModificarIntegrante/"+integrante.id,integrante, this.HttpUploadOptions);
  }

  eliminarIntegranteEspecifico(id:number):Observable<any>{

    return this.http.delete(environment.servidor+"/EliminarIntegrante/"+id,this.HttpUploadOptions)
  }

  guardarIntegranteEnFolder(imagenPerfil:File):Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', imagenPerfil);
    
    return this.http.post( environment.servidor+"/subirIntegrante",formData, this.HttpUploadOptions);
  }

  getIntegranteEnFolder():Observable<any>{
    return this.http.get(environment.servidor+"/ObtenerIntegrantesDelFolder");
  }
}
