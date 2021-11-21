import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //importamos solo client
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private servicio:HttpClient) { }

  consultarAdmin():Observable<any>{
    return this.servicio.get(environment.servidor+"/Admin")
  }
}
