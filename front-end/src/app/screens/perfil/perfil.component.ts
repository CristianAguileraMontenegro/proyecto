import { Component, OnInit } from '@angular/core';
import {listaArtistas} from '../../interfaces/artistas';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'//para ocupar validatos
import {Artistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras'
import { Router,ActivatedRoute } from '@angular/router';//nos permite recibir los datos
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ArtistasService} from '../../servicios/artistas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  
  artistaRecibido:number = 0;
  artistaActual:any;

  closeResult:string = "";

  imgenUrl:any;
  imagen:any;
  obrasUrl:any;
  almacenadorDeImagenes:Array<any> = [];
  imagenPerfil:any;
  obras:Array<any> = [];


  i:number = 0;
  j:number = 0;


  hayObras:boolean = false;


  opcionDeDispocicionSeleccionada:any;


  formulario:FormGroup;


  constructor(private ruta:ActivatedRoute, public formB:FormBuilder, private router:Router, private servicioImagenes:ImagenesService, private modalService: NgbModal, private servicioArtistas:ArtistasService) { 
    this.ruta.params.subscribe(datos=>{
      this.artistaRecibido = datos["id"]; //el nombre [] debe ser el mismo que en ap.routing
    });

    this.formulario=formB.group({
      nombreObra:["",[Validators.required]],
      descripcionObra:["",Validators.required],
      obras:["", Validators.required],
    });


    console.log("hola4343434");
    console.log(listaArtistas);
  }

  ngOnInit(): void {
    console.log("hola");
    this.identificarArtistaAMostrar();
  }

  identificarArtistaAMostrar(){
    
    this.artistaActual =  listaArtistas.find(objeto => objeto.id == this.artistaRecibido);//buscamos y guardamos al artista que comparta el id
    localStorage.setItem('artista',this.artistaActual);
    this.obtenerObrasDeArtista(this.artistaRecibido);
    console.log(this.artistaActual)
    
    
  
    
    
      
    
    /*for(let i = 0; i <  this.artistaActual.obrasArtista.length; i++)
    {
      this.hayObras = true;
      this.almacenadorDeImagenes.push(this.artistaActual.obrasArtista[i].url);
      
      let reader = new FileReader();
      reader.readAsDataURL( this.artistaActual.obrasArtista[i].archivo); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
      reader.onload = () =>{
        
      }
    }
    
    
    let reader = new FileReader();
    reader.readAsDataURL(this.artistaActual.fotoDePerfil); // es usado para leer el contenido del especificado Blob o File, luego de que se lea y se genera la bse 64 se pone readyState en done y se llama inmediatamanet a onload
    reader.onload = () =>{
      this.imgenUrl = reader.result;
    }*/
  }

  obtenerObrasDeArtista(id: number){
    this.servicioImagenes.consultarObrasTabla(id).subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
        this.obras.push(Observador[i]);
        console.log("hola");
      }
      this.mostrarObras();
    })
  }

  mostrarObras(){
    this.artistaActual.obrasArtista = this.obras;
    for(let i = 0; i < this.obras.length; i++){
      this.almacenadorDeImagenes.push('../../assets/obras/'+this.obras[i].ulr);
      this.hayObras = true;
      console.log(this.obras[i].ulr);
    }
    this.i = this.almacenadorDeImagenes.length;
  }

  capturarImagen(event:any){
    this.imagen = event.target.files[0];
    this.imgenUrl = this.imagen.name;

    let reader = new FileReader();
    
    reader.onload = (event:any) =>{
      this.obrasUrl = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
    
  }

  agregarImagen():boolean{

    let nombreObra:any = document.getElementById("nombreObra");
    let descripcionObra:any = document.getElementById("descripcionObra");
    let url:string = '../../assets/obras/'+this.imgenUrl;
    let obraAgregar:Obras = {id:this.i,nombre:nombreObra.value,descripcion:descripcionObra.value, ulr:this.imgenUrl, idArtista:this.artistaActual.id};
    

    if(this.validacionNombreObra() == true){
      return false
    }

    this.artistaActual.obrasArtista.push(obraAgregar);
    
    
    this.hayObras = true;

    this.almacenadorDeImagenes.push(url);
    console.log(this.almacenadorDeImagenes);
    this.i = this.i+1;

    let formulario:any = document.getElementById("formularioAgregarObra");
    formulario.style.display = "none";

    let boton:any = document.getElementById("botonAgregarObra");
    boton.style.display = "inline";

    console.log(this.imagen);

    this.servicioImagenes.guardarObraEnTabla(obraAgregar).subscribe(Observador=>{

    })

    this.servicioImagenes.guardarObra(this.imagen).subscribe((event:any)=>{

    })

    return true;
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

    this.servicioArtistas.modificarTipoDisplay(this.artistaActual.id, this.artistaActual.tipoDeDisplay).subscribe(Observador=>{
      
    })
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
    //Agregar funcion para mandar nueva foto al folder y modificar la tabala de artistas con la nues url

    this.servicioImagenes.guardarImagenPerfil(this.imagenPerfil).subscribe((event:any)=>{

    });

    this.servicioArtistas.modificarImagenPerfil(this.artistaActual.id, this.imagenPerfil.name).subscribe(Observador=>{
        this.artistaActual.fotoDePerfilULR = '../../assets/imagenesPerfil/'+this.imagenPerfil.name;
    })

    

    this.ocularInputFotoPerfil();
  }
   
  ocularInputFotoPerfil(){
    
    let input:any = document.getElementById("fotoDePerfil");
    input.style.display = "none"
  }

  validacionNombreObra():boolean{
    let nombreObra:any = document.getElementById("nombreObra");

    for (let index = 0; index < this.artistaActual.obrasArtista.length; index++) {
        if(this.artistaActual.obrasArtista[index].nombre == nombreObra.value){
          return true;
        }
    }

    return false;
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
