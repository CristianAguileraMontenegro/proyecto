import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';//para ocupar validatos
import {listaArtistas} from '../../interfaces/artistas';
import {adminPrueba} from '../../interfaces/admin';
import { Router } from '@angular/router';
import {AdminService} from '../../servicios/admin.service';
import {ArtistasService} from '../../servicios/artistas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  formulario:FormGroup;
  formularioValido:boolean = false;


  listaArtistasComprobar = listaArtistas;
  adminComprobar:any

  flagContrasenaGeneral:boolean = true;

  constructor(public FormB:FormBuilder, private router:Router, private servicioAdmin:AdminService, private servicioArtista:ArtistasService) {
    this.formulario=FormB.group({
      correo:["",[Validators.required]], //los "" son el value
      contrasena:["",[Validators.required]], //min y max para tipo number
      cuenta:["",Validators.required]
    })
    
  }
  ngOnInit(): void {
    this.listaArtistasComprobar.length = 0;
    this.adminComprobar = {};
    this.cargarArtistas();
    this.obtenerAdmin();
  }

  validarCorreoIngresadoArtista():boolean{

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

  validarCorreoIngresadoAdmin():boolean{

    let correo:any = document.getElementById("correo");
   
    let flagCorreo = false;

    if(correo.value == this.adminComprobar.correo)
    {
        flagCorreo = true; //existe el conrreo de artista
    }
    return flagCorreo;
  }

  validarIngreso():boolean{
      let correo:any = document.getElementById("correo");
      
      if(correo.value == " "){
  
        return false;
      }

      return true;
  }


  validarContrasenaIngresadoArtista():boolean{

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

  validarContrasenaIngresadoAdmin():boolean{

    let contrasenaUsuario:any = document.getElementById("contrasena");
    let flag = true;
    let flagContrasena = false;

    
    if(this.adminComprobar.contrasena == contrasenaUsuario.value)
    {
      flag = false;
      flagContrasena = true; //la contrasena concuerda con el de usuario
      this.flagContrasenaGeneral = true;
    }
    else{
      this.flagContrasenaGeneral = false;
    }
    

    return flagContrasena;
  }

  validacion():boolean{

    let eleccionDeTipoDeUsuario:any;
    let radioCheck:any = document.getElementsByClassName("form-check-input cuenta");
    for(let i = 0; i < radioCheck.length; i++){
        if(radioCheck[i].checked)
        {
          eleccionDeTipoDeUsuario = radioCheck[i].value;
        }
    }

    let flagCorreo:Boolean;
    let flagContrasena:Boolean;

    if(eleccionDeTipoDeUsuario == "Artista"){
      flagCorreo = this.validarCorreoIngresadoArtista();
      flagContrasena = this.validarContrasenaIngresadoArtista();

      if(flagCorreo && flagContrasena){

        return true;
      }
      
      return false;
    }
    else{
      flagCorreo = this.validarContrasenaIngresadoAdmin()
      flagContrasena = this.validarCorreoIngresadoAdmin()

      if(flagCorreo && flagContrasena){

        return true;
      }
      
      return false;
    }


   

    
  }

  verificarSiPuedeIrARuta(){

    let eleccionDeTipoDeUsuario:any;
    let radioCheck:any = document.getElementsByClassName("form-check-input cuenta");
    for(let i = 0; i < radioCheck.length; i++){
        if(radioCheck[i].checked)
        {
          eleccionDeTipoDeUsuario = radioCheck[i].value;
        }
    }

    if(eleccionDeTipoDeUsuario == "Artista"){
      if(this.formulario.valid && this.validacion()){

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
    else{
      if(this.formulario.valid && this.validacion()){
        this.router.navigate(['/admin']);///agregar ruta hacia el perfil con el id
      }
    }  
  }

  obtenerAdmin(){
    this.servicioAdmin.consultarAdmin().subscribe(Observador=>{
     
        this.adminComprobar.id = Observador.items.id_Admin;
        this.adminComprobar.correo = Observador.items.correo;
        this.adminComprobar.contrasena = Observador.items.contraseña;
     
    });
  }

  cargarArtistas(){
    this.servicioArtista.consultarArtista().subscribe(Observador =>{
      for (let i = 0; i < Observador.items.length; i++) {
        this.listaArtistasComprobar.push({id:Observador.items[i].id_Artistas, nombreReal:Observador.items[i].nombreReal, nombreArtista:Observador.items[i].nombreArtista, correo:Observador.items[i].correo, contrasena:Observador.items[i].contrasena, 
          nacionalidad:Observador.items[i].nacionalidad, descripcion:Observador.items[i].descripcion, obrasArtista:[] ,fotoDePerfilULR:"" ,tipoDeDisplay:Observador.items[i].tipoDeDisplaytipoDeDisplay});
      }
    });
  }

}
