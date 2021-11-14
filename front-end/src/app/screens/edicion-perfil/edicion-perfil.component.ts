import { Component, OnInit} from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';//para ocupar validatos
import {listaArtistas} from '../../interfaces/artistas';
import { Router,ActivatedRoute } from '@angular/router';//nos permite recibir los datos

@Component({
  selector: 'app-edicion-perfil',
  templateUrl: './edicion-perfil.component.html',
  styleUrls: ['./edicion-perfil.component.scss']
})
export class EdicionPerfilComponent implements OnInit {

  listaDeArtistas = listaArtistas;
  artistaAMoficar:any;

  archivo:File = {} as File;

  formulario:FormGroup;

  correoDeUsuario:boolean = true;
  contrasenaDeUsuario:boolean = true;
  flagUsuario:boolean = false;


  listaArtistiasComprobar = listaArtistas;
  


  constructor(public FormB:FormBuilder, private ruta:ActivatedRoute, private router:Router) { 
      this.formulario=FormB.group({
      correo:["",[Validators.required]], //los "" son el value
      contrasena:["",[Validators.required, Validators.minLength(5)]],//min y max para tipo numbercontrasena:["",[Validators.required, Validators.minLength(5)]], //min y max para tipo number
      nombre: ["",[Validators.required]],
      nombreArtistico:["",[Validators.required]],
      nacionalidad:["",[Validators.required]],
    });
    this.ruta.params.subscribe(datos=>{
      this.artistaAMoficar = datos["id"]; //el nombre [] debe ser el mismo que en ap.routing
    });
    
  }

  ngOnInit(): void {
    this.artistaAMoficar =  this.listaDeArtistas.find(objeto => objeto.id == this.artistaAMoficar);//buscamos y guardamos al artista que comparta el id
    this.formulario.get("correo")?.setValue(this.artistaAMoficar.correo);
    this.formulario.get("contrasena")?.setValue(this.artistaAMoficar.contrasena);
    this.formulario.get("nombre")?.setValue(this.artistaAMoficar.nombreReal);
    this.formulario.get("nombreArtistico")?.setValue(this.artistaAMoficar.nombreArtista);
    this.formulario.get("nacionalidad")?.setValue(this.artistaAMoficar.nacionalidad);
  }


  validacion1():boolean{

    
    let contrasenaArtista:any = document.getElementById("contrasena");
    let correoArtista:any = document.getElementById("correo");
    let nombre:any = document.getElementById("nombre");
    let nombreArtistico:any = document.getElementById("nombreArtistico");
    let nacionalidad:any = document.getElementById("nacionalidad");
    


    for(let i = 0; i < this.listaArtistiasComprobar.length; i++)
    {
      if(this.listaArtistiasComprobar[i].correo.localeCompare(correoArtista.value) == 0 && this.listaArtistiasComprobar[i].id != this.artistaAMoficar.id){ //recorremos el arreglo de artistas en busca de uno que comprata el conrreo con el ingresado
        this.correoDeUsuario = false; //en caso de que exista la varibale pasa a falsa indicando que existe un nombre de usuario igual
        this.flagUsuario = false;
        return false;
      }
      else{
        this.correoDeUsuario = true;
        this.flagUsuario = true;
      }
    }


    this.artistaAMoficar.correo = correoArtista.value;
    this.artistaAMoficar.contrasena = contrasenaArtista.value;
    this.artistaAMoficar.nombreReal = nombre.value;
    this.artistaAMoficar.nombreArtista = nombreArtistico.value;
    this.artistaAMoficar.nacionalidad = nacionalidad.value;

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

  llevarAPerfil(){
    this.router.navigate(['/perfil',this.artistaAMoficar.id]);///agregar ruta hacia el perfil con el id
  }
}
