import { Component, OnInit } from '@angular/core';
import {listaArtistas} from '../../interfaces/artistas';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'//para ocupar validatos
import {Artistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras'
import { Router,ActivatedRoute } from '@angular/router';//nos permite recibir los datos

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  listaDeArtistas = listaArtistas;
  artistaRecibido:number = 0;
  artistaActual:any;


  imgenUrl:any;
  imagen:any;
  obrasUrl:any;
  almacenadorDeImagenes:Array<any> = [];
  imagenPerfil:any;


  i:number = 0;
  j:number = 0;


  hayObras:boolean = false;


  opcionDeDispocicionSeleccionada:any;


  formulario:FormGroup;


  constructor(private ruta:ActivatedRoute, public formB:FormBuilder, private router:Router) { 
    this.ruta.params.subscribe(datos=>{
      this.artistaRecibido = datos["id"]; //el nombre [] debe ser el mismo que en ap.routing
    });

    this.formulario=formB.group({
      nombreObra:["",[Validators.required]],
      descripcionObra:["",Validators.required],
      obras:["", Validators.required],
  })
  }

  ngOnInit(): void {
    this.artistaActual =  this.listaDeArtistas.find(objeto => objeto.id == this.artistaRecibido);//buscamos y guardamos al artista que comparta el id
    for(let i = 0; i <  this.artistaActual.obrasArtista.length; i++)
    {
      this.hayObras = true;

      let reader = new FileReader();
      reader.readAsDataURL( this.artistaActual.obrasArtista[i].archivo); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
      reader.onload = () =>{
        this.almacenadorDeImagenes.push(reader.result);
      }
    }
    
    
    let reader = new FileReader();
    reader.readAsDataURL(this.artistaActual.fotoDePerfil); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
    reader.onload = () =>{
      this.imgenUrl = reader.result;
    }
  }

  mostarIngresoObra(){

    let formulario:any = document.getElementById("formularioAgregarObra");
    formulario.style.display = "inline";

    let boton:any = document.getElementById("botonAgregarObra");
    boton.style.display = "none";
    
  }

  capturarImagen(event:any){
    this.imagen = event.target.files[0];

    let reader = new FileReader();
    
    
    reader.onload = (event:any) =>{
      this.obrasUrl = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
    
  }

  agregarImagen(){

    let nombreObra:any = document.getElementById("nombreObra");
    let descripcionObra:any = document.getElementById("descripcionObra");

    let obraAgregar:Obras = {id:this.i,nombre:nombreObra.value,descripcion:descripcionObra.value,archivo:this.imagen};
    
    this.artistaActual.obrasArtista.push(obraAgregar);
    
    this.hayObras = true;

    this.almacenadorDeImagenes.push(this.obrasUrl);

    this.i = this.i+1;

    let formulario:any = document.getElementById("formularioAgregarObra");
    formulario.style.display = "none";

    let boton:any = document.getElementById("botonAgregarObra");
    boton.style.display = "inline";
  }

  srcObras(obras:any){


    let reader = new FileReader();
    
    
    reader.onload = (event:any) =>{
      this.obrasUrl = event.target.result;
    }
    reader.readAsDataURL(obras.archivo);

    console.log(this.obrasUrl);
  }


  elegirOpcion(evento:any){

    this.opcionDeDispocicionSeleccionada = evento.target.value;
    this.artistaActual.tipoDeDisplay = this.opcionDeDispocicionSeleccionada;
  }

  llevarAEdicion(){
    this.router.navigate(['/edicion',this.artistaActual.id]);///agregar ruta hacia el perfil con el id
  }  

  modificarImagen(){
    let input:any = document.getElementById("fotoDePerfil");
    input.style.display = "inline"
  }

  capturarImagenPerfil(event:any){
    this.imagenPerfil = event.target.files[0];
    

    if(this.imagenPerfil == undefined){
        this.ocularInputFotoPerfil();
    }
    else{
      let reader = new FileReader();
      reader.onload = (event:any) =>{
        this.imgenUrl = event.target.result;
        this.artistaActual.fotoDePerfil = this.imagenPerfil;
        this.ocularInputFotoPerfil();
        
      }
      reader.readAsDataURL(this.imagenPerfil);
    }
    
  }

  ocularInputFotoPerfil(){
    
    let input:any = document.getElementById("fotoDePerfil");
    input.style.display = "none"
  }
}
