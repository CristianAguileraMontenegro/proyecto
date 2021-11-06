import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';//para ocupar validatos
import {listaArtistas} from '../../interfaces/artistas';
import {Artistas} from '../../interfaces/artistas';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formulario:FormGroup;
  formularioValido:boolean = false;

  correoDeUsuario:boolean = true;
  contrasenaDeUsuario:boolean = true;
  flagUsuario:boolean = false;

  listaArtistiasComprobar = listaArtistas;



  constructor(public FormB:FormBuilder) {
    this.formulario=FormB.group({
      correo:["",[Validators.required]], //los "" son el value
      contrasena:["",[Validators.required, Validators.minLength(5)]],//min y max para tipo numbercontrasena:["",[Validators.required, Validators.minLength(5)]], //min y max para tipo number
      nombre: ["",[Validators.required]],
      nombreArtistico:["",[Validators.required]],
      nacionalidad:["",[Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  validacion1():boolean{

    
    let contrasenaArtista:any = document.getElementById("contrasena");
    let correoArtista:any = document.getElementById("correo");
    let nombre:any = document.getElementById("nombre");
    let nombreArtistico:any = document.getElementById("nombreArtistico");
    let nacionalidad:any = document.getElementById("nacionalidad");


    for(let i = 0; i < this.listaArtistiasComprobar.length; i++)
    {
      if(this.listaArtistiasComprobar[i].correo.localeCompare(correoArtista.value) == 0){ //recorremos el arreglo de artistas en busca de uno que comprata el conrreo con el ingresado
        this.correoDeUsuario = false; //en caso de que exista la varibale pasa a falsa indicando que existe un nombre de usuario igual
        this.flagUsuario = false;
        return false;
      }
      else{
        this.correoDeUsuario = true;
        this.flagUsuario = true;
      }
    }


    let nuevoId:number = this.listaArtistiasComprobar.length+1;
    


    let artistiaAgregar:Artistas = {id:nuevoId, nombreReal:nombre.value, nombreArtista:nombreArtistico.value, correo:correoArtista.value,contrasena:contrasenaArtista.value, nacionalidad:nacionalidad.value}

    listaArtistas.push(artistiaAgregar);
    console.log(listaArtistas);
    this.correoDeUsuario = true;

    return true;
  }

  validacionMensajeCorreoArtista():boolean{
      if(this.correoDeUsuario == false)
      {
        return true;
      }
    
      this.correoDeUsuario = true;
    return false;
  }

  validacionMensajeArtistaCreado():boolean{
    if(this.flagUsuario == true)
    {
      return true;
    }
  
    return false;
  }
}