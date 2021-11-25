import { Component, OnInit } from '@angular/core';
import {listaArtistas} from '../../interfaces/artistas';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'//para ocupar validatos
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

  listaArtistas:any;
  artistaRecibido:number = 0;
  artistaActual: any;

  closeResult:string = "";


  flag:boolean =false; //opcupada para la generacion del index y que no genere antes de que carge todo el artista
  imgenUrl:any;
  imagen:any;
  imageInfos:any = [];
  obrasUrl:any;
  almacenadorDeImagenes:Array<any> = [];
  imagenPerfil:any;
  obras:Array<any> = [];


  foto:any
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

   
    
  }

  ngOnInit(): void {
    
    this.identificarArtistaAMostrar();
  }

  identificarArtistaAMostrar(){
  
      
      this.obtenerImagenesPerfil();
      this.obtenerArtista();
      
    



    
      
    
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

  //--------------------------Imagnes------------------------------
  obtenerObrasDeArtista(id: number){
    this.servicioImagenes.consultarObrasTabla(id).subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
        this.obras.push(Observador[i]);
       
      }
      this.mostrarObras();
    })
  }

  mostrarObras(){

    this.servicioImagenes.getObrasFolder().subscribe(Observador=>{
      this.artistaActual.obrasArtista = this.obras;
      for (let i = 0; i <  Observador.length; i++) {
        for (let j = 0; j < this.obras.length; j++ )
        {
          if(Observador[i].name == this.obras[j].ulr)
          {
            this.almacenadorDeImagenes.push(Observador[i].url);
            this.hayObras = true;
          }
        }
      }
       this.i = this.almacenadorDeImagenes.length;
    });

   
  }

  obtenerImagenesPerfil(){
    this.servicioImagenes.getImagenPerfilFolder().subscribe(Observador=>{
      for (let i = 0; i <  Observador.length; i++) {
       
        this.imageInfos.push(Observador[i]);   
      }
    });
  }  

  obtenerArtista(){
    this.servicioArtistas.consultarArtistaEspecifco(this.artistaRecibido).subscribe(Observador=>{
        
      console.log("llegue");
      let flag:boolean = true;
      
      
      for (let j = 0; j < this.imageInfos.length && flag; j++) {
          
        console.log("hola"+j);
        if(this.imageInfos[j].name == Observador[0].fotoDePerfilULR){
            
            flag = false;
            this.artistaActual = {id:Observador[0].id_Artistas, nombreReal:Observador[0].nombreReal, nombreArtista:Observador[0].nombreArtista, correo:Observador[0].correo, contrasena:Observador[0].contrasena, 
            nacionalidad:Observador[0].nacionalidad, descripcion:Observador[0].descripcion, obrasArtista:[],fotoDePerfilULR:this.imageInfos[j].url ,tipoDeDisplay:Observador[0].tipoDeDisplaytipoDeDisplay}

            this.listaArtistas = this.servicioArtistas.consultarArtista();
            this.obtenerObrasDeArtista(this.artistaRecibido);
            console.log("el artista actual");
            console.log(this.artistaActual.id);
        }
      }

      this.flag = true;
    });
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

    this.artistaActual.obrasArtista.push(obraAgregar);//agregamos la obra al artista
    
    this.hayObras = true; //indicamos que hay una obra

    this.almacenadorDeImagenes.push(url);//almacenamos la url de la imagen
    
    this.i = this.i+1;//autoamuentamos el id de la obra para evitar repeticiones en un usuario

    let formulario:any = document.getElementById("formularioAgregarObra");
    formulario.style.display = "none"; //ocultamos el formulario

    let boton:any = document.getElementById("botonAgregarObra");
    boton.style.display = "inline"; //volvemos a mostrar el boton

    this.servicioImagenes.guardarObraEnTabla(obraAgregar).subscribe(Observador=>{

    })//guardamos la obra en la tabla de obras de la base da datos

    this.servicioImagenes.guardarObra(this.imagen).subscribe((event:any)=>{

    })//guarfdamos la obra en el folder de obras.

    return true;//retornamos true ya que se agrego la obra correctamente
  }

  srcObras(obras:any){
    let reader = new FileReader();
    
    
    reader.onload = (event:any) =>{
      this.obrasUrl = event.target.result;
    }
    reader.readAsDataURL(obras.archivo);

    //console.log(this.obrasUrl);
  }

  modificarImagen(){
    let input:any = document.getElementById("fotoDePerfil");//obtenemos el input de imagen
    input.style.display = "inline";//mostramos el mismo
  }

  capturarImagenPerfil(event:any){
    this.imagenPerfil = event.target.files[0];//obtenemos el archivo de imagen

    this.servicioImagenes.guardarImagenPerfil(this.imagenPerfil).subscribe((event:any)=>{

    });//guardamos la nueva imagen de perfil en el folder

    this.servicioArtistas.modificarImagenPerfil(this.artistaActual.id, this.imagenPerfil.name).subscribe(Observador=>{
        this.artistaActual.fotoDePerfilULR = '../../assets/imagenesPerfil/'+this.imagenPerfil.name;
    });//modificamos la imagen de perfil en la base de datos 
    //dentro indicamos a las varibales locales la nueva direccion, se hace dentro para evitar problemas de sincronizacion

    this.ocularInputFotoPerfil();//finalmente ocultamos el input
  }

  ocularInputFotoPerfil(){
    let input:any = document.getElementById("fotoDePerfil");
    input.style.display = "none"
  }

  validacionNombreObra():boolean{
    let nombreObra:any = document.getElementById("nombreObra");
    let nombreGoblal:any;
    let flag:boolean = false;
    
    for(let i = 0; i < this.listaArtistas.length; i++)
    {
      nombreGoblal =  this.listaArtistas[i].obrasArtista.find((o:any) => o.nombre == nombreObra);
      if(nombreGoblal == nombreObra)
      {
        return true;
      }
    }

    for (let index = 0; index < this.artistaActual.obrasArtista.length; index++) {
      if(this.artistaActual.obrasArtista[index].nombre == nombreObra.value){
          return true;
      }
    }
    

    return false;
  }

//--------------------------Imagnes------------------------------

  elegirOpcion(evento:any){

    this.opcionDeDispocicionSeleccionada = evento.target.value;
    this.artistaActual.tipoDeDisplay = this.opcionDeDispocicionSeleccionada;

    this.servicioArtistas.modificarTipoDisplay(this.artistaActual.id, this.artistaActual.tipoDeDisplay).subscribe(Observador=>{
      
    })
  }

  llevarAEdicion(){
    this.router.navigate(['/edicion',this.artistaActual.id]);///agregar ruta hacia el perfil con el id
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
