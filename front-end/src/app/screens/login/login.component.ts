import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';//para ocupar validatos
import {listaArtistas} from '../../interfaces/artistas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formulario:FormGroup;
  formularioValido:boolean = false;


  listaArtistasComprobar = listaArtistas;

  flagContrasenaGeneral:boolean = true;

  constructor(public FormB:FormBuilder, private router:Router) {
    this.formulario=FormB.group({
      correo:["",[Validators.required]], //los "" son el value
      contrasena:["",[Validators.required]], //min y max para tipo number
    })
    
  }
  ngOnInit(): void {
  }

  validarCorreoIngresado():boolean{

    let correoArtista:any = document.getElementById("correo");
    let flag = true;
    let flagCorreo = false;

   
    for(let i = 0; i < this.listaArtistasComprobar.length && flag; i++)
    {
        if(this.listaArtistasComprobar[i].correo.localeCompare(correoArtista.value) == 0)
        {
            flag = false;
            flagCorreo = true; //existe el conrreo de artista
        }
    }

    return flagCorreo;
  }

  validarIngreso():boolean{
      let correoArtista:any = document.getElementById("correo");
      
      if(correoArtista.value == " "){
  
        return false;
      }

      return true;
  }


  validarContrasenaIngresado():boolean{

    let contrasenaUsuario:any = document.getElementById("contrasena");
    let correoArtista:any = document.getElementById("correo");
    let flag = true;
    let flagContrasena = false;

    for(let i = 0; i < this.listaArtistasComprobar.length && flag; i++)
    {
        if(this.listaArtistasComprobar[i].contrasena.localeCompare(contrasenaUsuario.value) == 0 && (this.listaArtistasComprobar[i].correo.localeCompare(correoArtista.value) == 0))
        {
            flag = false;
            flagContrasena = true; //la contrasena concuerda con el de usuario
            this.flagContrasenaGeneral = true;
        }
        else{
          this.flagContrasenaGeneral = false;
        }
    }

    return flagContrasena;
  }

  validacion():boolean{

    let flagCorreo:Boolean;
    let flagContrasena:Boolean;

    flagCorreo = this.validarCorreoIngresado();
    flagContrasena = this.validarContrasenaIngresado();

    if(flagCorreo && flagContrasena){

      return true;
    }
    
    return false;
  }

  verificarSiPuedeIrARuta(){
    if(this.formulario.valid && this.validarCorreoIngresado() && this.flagContrasenaGeneral && this.validacion()){

      let contrasenaUsuario:any = document.getElementById("contrasena");
      let correoArtista:any = document.getElementById("correo"); //////
      let flag = true;
      

      for(let i = 0; i < this.listaArtistasComprobar.length && flag; i++)
      {
          if((this.listaArtistasComprobar[i].correo.localeCompare(correoArtista.value) == 0))
          {
              flag = false;
              this.router.navigate(['/perfil',this.listaArtistasComprobar[i].id]);///agregar ruta hacia el perfil con el id
          }
      }
       
      
    }
}

}
