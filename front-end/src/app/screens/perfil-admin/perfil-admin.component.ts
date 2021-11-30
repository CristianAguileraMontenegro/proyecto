import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {listaArtistas} from '../../interfaces/artistas';
import {listaNoticias, Noticias} from '../../interfaces/noticias';
import {listaTeam, IntegranteTeam} from '../../interfaces/integrante-team';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import {NoticiasService} from '../../servicios/noticias.service';
import {IntegrantesService} from '../../servicios/integrantes.service';
import {ArtistasService} from '../../servicios/artistas.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {

  formularioNoticia:FormGroup;
  formularioNoticiaEditar:FormGroup;
  formularioTeam:FormGroup;
  formularioTeamEditar:FormGroup;
  formularioValido:boolean=false;


  tituloDeNoticiaV:boolean=true;
  noticiaFlag:boolean=false;
  
  listaDeArtistas = listaArtistas;
  listaDeNoticias:any = [];
  listaDeIntegrantes = listaTeam;

  integranteEditar:any;
  noticiaEditable:any;

  imagen:any;
  imgenUrl:any;
  imagenMostrar:any;
  closeResult:string = '';

  constructor(private modalService: NgbModal, public FormB:FormBuilder, public FormBEditar:FormBuilder, public FormB2:FormBuilder, public FormB2Editar:FormBuilder, 
    private servicioNoticia:NoticiasService, private servicioIntegrante:IntegrantesService, private servicioArtista:ArtistasService) {
    this.formularioNoticia=FormB.group({
      titulo:["",[Validators.required]],
      descripcion:["",[Validators.required, Validators.minLength(10)]],
      fotoNoticia:["",[Validators.required]]
    });
    this.formularioNoticiaEditar=FormBEditar.group({
      tituloEditar:["",[Validators.required]],
      descripcionEditar:["",[Validators.required, Validators.minLength(10)]],
      fotoNoticiaEditar:["",[Validators.required]]
    });
    this.formularioTeam=FormB2.group({
      nombreIntegrante:["",[Validators.required]],
      descripcionIntegrante:["",[Validators.required,Validators.minLength(10)]],
      cargoIntegrante:["",[Validators.required]],
      fotoPerfil:["",[Validators.required]]
    })
    this.formularioTeamEditar=FormB2Editar.group({
      nombreIntegranteEditar:["",[Validators.required]],
      descripcionIntegranteEditar:["",[Validators.required,Validators.minLength(10)]],
      cargoIntegranteEditar:["",[Validators.required]],
      fotoPerfilEditar:["",[Validators.required]]
    })
  }

  ngOnInit(): void {
    
    this.listaDeNoticias.length = 0;
    this.listaDeIntegrantes.length = 0;
    this.listaDeArtistas.length = 0;
    this.cargarNoticias();
    this.cargarIntegrante();
    this.cargarArtistas();
    //agregar la carga de noticias, artistas y integrante team
  }

  cargarNoticias(){
    this.servicioNoticia.consultarNoticias().subscribe(Observador =>{

        for (let i = 0; i < Observador.items.length; i++) {
          this.listaDeNoticias.push({titulo:Observador.items[i].titulo, texto:Observador.items[i].texto, id:Observador.items[i].id, imagenURL:Observador.items[i].imagenURL});
        }
    });
  };

  cargarIntegrante(){
    this.servicioIntegrante.consultarIntegrantes().subscribe(Observador =>{

      for (let i = 0; i < Observador.items.length; i++) {
        this.listaDeIntegrantes.push({id:Observador.items[i].id, nombre:Observador.items[i].nombre, cargo:Observador.items[i].cargo, descripcion:Observador.items[i].descripcion, imagen:Observador.items[i].imagen});
      }
    });
  };

  cargarArtistas(){
    this.servicioArtista.consultarArtista().subscribe(Observador =>{
      for (let i = 0; i < Observador.items.length; i++) {
        this.listaDeArtistas.push({id:Observador.items[i].id_Artistas, nombreReal:Observador.items[i].nombreReal, nombreArtista:Observador.items[i].nombreArtista, correo:Observador.items[i].correo, contrasena:Observador.items[i].contrasena, 
          nacionalidad:Observador.items[i].nacionalidad, descripcion:Observador.items[i].descripcion, obrasArtista:[] ,fotoDePerfilULR:"" ,tipoDeDisplay:Observador.items[i].tipoDeDisplaytipoDeDisplay});
      }
    });
  }

  validacion1():boolean{
    let tituloNoticia:any= document.getElementById("titulo");
    let descripcionNoticia:any= document.getElementById("descripcion");
    let formulario:any = document.getElementById("formularioNoticia");
    

    for(let i = 0; i<this.listaDeNoticias.length; i++){
      if(this.listaDeNoticias[i].titulo.localeCompare(tituloNoticia.value) == 0){
          this.tituloDeNoticiaV=false;
          this.noticiaFlag=false;
          
          return false;
      }
      else{
        this.noticiaFlag=true;
        this.tituloDeNoticiaV=true;
      }
    }

    let index:number= this.listaDeNoticias.length;
    let nuevoId:number;
    if(index==0){
      nuevoId = 1;
    }
    else{
      nuevoId = (this.listaDeNoticias[index-1].id)+1;
    }
    
    let noticiaAgregar:Noticias = {titulo:tituloNoticia.value, texto: descripcionNoticia.value, id:nuevoId, imagenURL:this.imgenUrl}
    
    listaNoticias.push(noticiaAgregar);
    //guardar noticia en base de datos
    this.servicioNoticia.guardarNoticiasEnTabla(noticiaAgregar).subscribe(Observador =>{

    });

    this.servicioNoticia.guardarNoticiasEnFolder(this.imagen).subscribe(Observador =>{

    });

    
    this.listaDeNoticias.push(noticiaAgregar);
    this.tituloDeNoticiaV = true;
    formulario.style.display = "none";
    formulario.reset();
    this.imagenMostrar = "";
    return true;
  }
  validacion1Editar():boolean{
    let tituloNoticia:any= document.getElementById("tituloEditar");
    let descripcionNoticia:any= document.getElementById("descripcionEditar");
    let formulario:any = document.getElementById("formularioNoticiaEditar");

    for(let i = 0; i<this.listaDeNoticias.length; i++){
      if(this.listaDeNoticias[i].titulo.localeCompare(tituloNoticia.value) == 0){
          this.tituloDeNoticiaV=false;
          this.noticiaFlag=false;
          return false;
      }
      else{
        this.noticiaFlag=true;
        this.tituloDeNoticiaV=true;
      }
    }

    for(let i = 0; i<this.listaDeNoticias.length; i++){
      if(this.listaDeNoticias[i].id == this.noticiaEditable.id){
        this.listaDeNoticias[i].titulo = tituloNoticia.value;
        this.listaDeNoticias[i].texto = descripcionNoticia.value;
        this.listaDeNoticias[i].imagenURL = this.imgenUrl;

        this.servicioNoticia.modificarNoticiaEspecifica(this.listaDeNoticias[i]).subscribe(Observador =>{

        });

        this.servicioNoticia.guardarNoticiasEnFolder(this.imagen).subscribe(Observador =>{

        });

      }
    }
  
    this.tituloDeNoticiaV = true;
    formulario.style.display = "none";
    formulario.reset();
    this.imagenMostrar = "";
    return true;
  }

  validacion2():boolean{

    let nombreIntegrante:any= document.getElementById("nombreIntegrante");
    let cargoIntegrante:any= document.getElementById("cargoIntegrante");
    let descripcionIntegrante:any= document.getElementById("descripcionIntegrante");
    let formulario:any = document.getElementById("formularioTeam");
    
    let total:number = this.listaDeIntegrantes.length;
    let nuevoId:number = 0;
    if(total == 0)
    {
      nuevoId = 1;
    }
    else{
      nuevoId = (this.listaDeIntegrantes[total-1].id)+1;
    }
    

    
    let integranteAgregar:IntegranteTeam = {id: nuevoId, nombre:nombreIntegrante.value, cargo:cargoIntegrante.value, descripcion:descripcionIntegrante.value, imagen:this.imgenUrl}
  
    listaTeam.push(integranteAgregar);

    this.servicioIntegrante.guardarIntegranteEnTabla(integranteAgregar).subscribe(Observador =>{

    });

    this.servicioIntegrante.guardarIntegranteEnFolder(this.imagen).subscribe(Observador =>{

    })

    formulario.style.display = "none";
    formulario.reset();
    this.imagenMostrar = "";
    return true;
  }
  
  validacion2Editar():boolean{
    
    let nombreIntegrante:any= document.getElementById("nombreIntegranteEditar");
    let cargoIntegrante:any= document.getElementById("cargoIntegranteEditar");
    let descripcionIntegrante:any= document.getElementById("descripcionIntegranteEditar");
    let formulario:any = document.getElementById("formularioTeamEditar");
    

    for(let i=0; i<this.listaDeIntegrantes.length; i++){
      if(this.listaDeIntegrantes[i].id == this.integranteEditar.id){
        this.listaDeIntegrantes[i].nombre = nombreIntegrante.value;
        this.listaDeIntegrantes[i].cargo = cargoIntegrante.value;
        this.listaDeIntegrantes[i].descripcion= descripcionIntegrante.value;
        this.listaDeIntegrantes[i].imagen = this.imgenUrl;


        this.servicioIntegrante.modificarIntegranteEspecifico(this.listaDeIntegrantes[i]).subscribe(Observador =>{

        });

        this.servicioIntegrante.guardarIntegranteEnFolder(this.imagen).subscribe(Observador =>{

        });

      }
    }
    formulario.style.display = "none";
    formulario.reset();
    this.imagenMostrar = "";
    return true;
  }

  validacionMensajeTituloNoticia():boolean{
    if(this.tituloDeNoticiaV == false)
    {
      return true;
    }
  
    this.tituloDeNoticiaV = true;
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

  eliminarArtista(id:any){
    //listaArtistas.filter(artista => artista.id != id);
    let index = this.listaDeArtistas.findIndex(e => id == e.id);
    this.listaDeArtistas.splice(index,1);
    this.servicioArtista.eliminarObrasArtistaEspecifico(id).subscribe(Observador =>{//primero se eliminan las obraa

    });

    this.servicioArtista.eliminarArtistaEspecifico(id).subscribe(Observador =>{

    });
  }

  eliminarNoticia(id:any){
    let index = this.listaDeNoticias.findIndex((e:any) => id == e.id);
    this.listaDeNoticias.splice(index, 1);
    this.servicioNoticia.eliminarNoticiaEspicifica(id).subscribe(Observador =>{

    });
  }

  eliminarIntegrante(id:any){
    
    let index = this.listaDeIntegrantes.findIndex(e => id == e.id);
    this.listaDeIntegrantes.splice(index, 1);
    this.servicioIntegrante.eliminarIntegranteEspecifico(id).subscribe(Observador =>{

    });
    
  }

  llenarForm(noticiaEditar:Noticias){
    this.formularioNoticiaEditar.get("tituloEditar")?.setValue(noticiaEditar.titulo);
    this.formularioNoticiaEditar.get("descripcionEditar")?.setValue(noticiaEditar.texto);
    this.noticiaEditable = noticiaEditar; 
    let flag:boolean = true;
    this.servicioNoticia.getNoticiasFolder().subscribe(Observador =>{
      
      for (let index = 0; index < Observador.length && flag; index++) {
          if(Observador[index].name == noticiaEditar.imagenURL){
            this.imagenMostrar = Observador[index].url;
            flag = false;
          }
        
      }
    });
  }

  llenarForm2(integranteEditar:IntegranteTeam){
    this.formularioTeamEditar.get("nombreIntegranteEditar")?.setValue(integranteEditar.nombre);
    this.formularioTeamEditar.get("cargoIntegranteEditar")?.setValue(integranteEditar.cargo);
    this.formularioTeamEditar.get("descripcionIntegranteEditar")?.setValue(integranteEditar.descripcion);
    this.integranteEditar = integranteEditar;
    let flag:boolean = true;
    this.servicioIntegrante.getIntegranteEnFolder().subscribe(Observador =>{
      
      for (let index = 0; index < Observador.length && flag; index++) {
        if(Observador[index].name == integranteEditar.imagen){
          this.imagenMostrar = Observador[index].url;
          flag = false;
        }
      
    }
    });
  }

  capturarImagenNoticia(event:any){
    this.imagen = event.target.files[0];
    this.imgenUrl = this.imagen.name;
    

    let reader = new FileReader();
    
    reader.onload = (event:any) =>{
      this.imagenMostrar = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
    
    //cambiar esto y crear uno para cada input imagen
  }

  capturarImagenIntegrante(event:any){
    this.imagen = event.target.files[0];
    this.imgenUrl = this.imagen.name;
    

    let reader = new FileReader();
    
    reader.onload = (event:any) =>{
      this.imagenMostrar = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
    
    //cambiar esto y crear uno para cada input imagen
  }

}