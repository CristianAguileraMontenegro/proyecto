import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';//para ocupar validatos
import {listaArtistas} from '../../interfaces/artistas';
import {Artistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras';
import {ArtistasService} from '../../servicios/artistas.service';
import {ImagenesService} from '../../servicios/imagenes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formulario:FormGroup;
  formularioValido:boolean = false;

  correoDeUsuario:boolean = true;
  nombreArtisticoV:boolean = true;
  contrasenaDeUsuario:boolean = true;
  flagUsuario:boolean = false;

  imagen:any;
  imgenUrl:any;
  imagenNombre:any;

  listaArtistiasComprobar = listaArtistas;



  constructor(public FormB:FormBuilder, private servicioArtista:ArtistasService, private servicioImagenes:ImagenesService) {
    this.formulario=FormB.group({
      correo:["",[Validators.required]], //los "" son el value
      contrasena:["",[Validators.required, Validators.minLength(5)]],//min y max para tipo numbercontrasena:["",[Validators.required, Validators.minLength(5)]], //min y max para tipo number
      nombre: ["",[Validators.required]],
      nombreArtistico:["",[Validators.required]],
      nacionalidad:["",[Validators.required]],
      descripcion:["",[Validators.required, Validators.minLength(30)]],
      fotoDePerfil:["",[Validators.required]]

    })
  }

  ngOnInit(): void {
  }

  capturarImagen(event:any){
    this.imagen = event.target.files[0];
    this.imagenNombre = event.target.files[0].name;
    console.log(this.imagen);

    let reader = new FileReader();
    reader.readAsDataURL(this.imagen);
    reader.onload = (event:any) =>{
      this.imgenUrl = event.target.result;
    }
    
  }


  validacion1():boolean{

    
    let contrasenaArtista:any = document.getElementById("contrasena");
    let correoArtista:any = document.getElementById("correo");
    let nombre:any = document.getElementById("nombre");
    let nombreArtistico:any = document.getElementById("nombreArtistico");
    let nacionalidad:any = document.getElementById("nacionalidad");
    let descripcion:any = document.getElementById("descripcion");
    


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

    for(let i = 0; i < this.listaArtistiasComprobar.length; i++)
    {
      if(this.listaArtistiasComprobar[i].nombreArtista.localeCompare(nombreArtistico.value) == 0){ //recorremos el arreglo de artistas en busca de uno que comprata el conrreo con el ingresado
        this.nombreArtisticoV = false; //en caso de que exista la varibale pasa a falsa indicando que existe un nombre de usuario igual
        this.flagUsuario = false;
        return false;
      }
      else{
        this.nombreArtisticoV = true;
        this.flagUsuario = true;
      }
    }

    

    let nuevoId:number = this.listaArtistiasComprobar.length+1;
    let obrasBase = new Array<Obras>();

  
    let artistiaAgregar:Artistas = {id:nuevoId, nombreReal:nombre.value, nombreArtista:nombreArtistico.value, correo:correoArtista.value,contrasena:contrasenaArtista.value, nacionalidad:nacionalidad.value,descripcion:descripcion.value, obrasArtista:obrasBase, fotoDePerfil:this.imagen, tipoDeDisplay:2, fotoDePerfilULR:this.imagenNombre}

    //aqui poner el servicio que envia la imagen al folder

    this.servicioArtista.guardarArtistas(artistiaAgregar).subscribe(Observador=>{

    })

    this.servicioImagenes.guardarImagenPerfil(this.imagen).subscribe((event:any)=>{

    })
    
    listaArtistas.push(artistiaAgregar);
    console.log(artistiaAgregar.fotoDePerfil);
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

  validacionNombreArtistico():boolean{
    if(this.nombreArtisticoV == false)
      {
        return true;
      }
    
      this.nombreArtisticoV = true;
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
