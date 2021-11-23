import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {listaArtistas} from '../../interfaces/artistas';
import {listaNoticias, Noticias} from '../../interfaces/noticias';
import {listaTeam, IntegranteTeam} from '../../interfaces/integrante-team';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {

  formularioNoticia:FormGroup;
  formularioTeam:FormGroup;
  formularioValido:boolean=false;


  tituloDeNoticiaV:boolean=true;
  noticiaFlag:boolean=false;
  
  listaDeArtistas = listaArtistas;
  listaDeNoticias = listaNoticias;
  listaDeIntegrantes = listaTeam;

  integranteEditar:any;
  noticiaEditable:any;

  imagen:any;
  imgenUrl:any;
  closeResult:string = '';

  constructor(private modalService: NgbModal, public FormB:FormBuilder, public FormB2:FormBuilder) {
    this.formularioNoticia=FormB.group({
      titulo:["",[Validators.required]],
      descripcion:["",[Validators.required, Validators.minLength(10)]],
      fotoNoticia:["",[Validators.required]]
    });
    this.formularioTeam=FormB2.group({
      nombreIntegrante:["",[Validators.required]],
      descripcionIntegrante:["",[Validators.required,Validators.minLength(10)]],
      cargoIntegrante:["",[Validators.required]],
      fotoPerfil:["",[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  validacion1():boolean{
    let tituloNoticia:any= document.getElementById("titulo");
    let descripcionNoticia:any= document.getElementById("descripcion");

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
    
    let noticiaAgregar:Noticias = {titulo:tituloNoticia.value, texto: descripcionNoticia.value, id:nuevoId, imagenNoticias:this.imagen, imagenURL:this.imgenUrl}
    
    listaNoticias.push(noticiaAgregar);
    this.tituloDeNoticiaV = true;
    return true;
  }
  validacion1Editar():boolean{
    let tituloNoticia:any= document.getElementById("titulo");
    let descripcionNoticia:any= document.getElementById("descripcion");

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
      }
    }
  
    this.tituloDeNoticiaV = true;
    return true;
  }

  validacion2():boolean{
    let nombreIntegrante:any= document.getElementById("nombreIntegrante");
    let cargoIntegrante:any= document.getElementById("cargoIntegrante");
    let descripcionIntegrante:any= document.getElementById("descripcionIntegrante");
    

    let nuevoId:number = this.listaDeIntegrantes[length+1].id+1;
    
    let integranteAgregar:IntegranteTeam = {id: nuevoId, nombre:nombreIntegrante.value, cargo:cargoIntegrante.value, descripcion:descripcionIntegrante.value, descripcionFull:"", imagen:this.imagen}
    
    listaTeam.push(integranteAgregar);
    return true;
  }
  
  validacion2Editar():boolean{
    let nombreIntegrante:any= document.getElementById("nombreIntegrante");
    let cargoIntegrante:any= document.getElementById("cargoIntegrante");
    let descripcionIntegrante:any= document.getElementById("descripcionIntegrante");
    

    for(let i=0; i<this.listaDeIntegrantes.length; i++){
      if(this.listaDeIntegrantes[i].id == this.integranteEditar.id){
        this.listaDeIntegrantes[i].nombre = nombreIntegrante.value;
        this.listaDeIntegrantes[i].cargo = cargoIntegrante.value;
        this.listaDeIntegrantes[i].descripcion= descripcionIntegrante.value;
      }
    }
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
    let index = listaArtistas.findIndex(e => id == e.id);
    listaArtistas.splice(index,1);
  }

  eliminarNoticia(id:any){
    let index = listaNoticias.findIndex(e => id == e.id);
    listaNoticias.splice(index, 1);
  }

  eliminarIntegrante(id:any){
    
    let index = listaTeam.findIndex(e => id == e.id);
    listaTeam.splice(index, 1);
    
  }

  llenarForm(noticiaEditar:Noticias){
    this.formularioNoticia.get("titulo")?.setValue(noticiaEditar.titulo);
    this.formularioNoticia.get("descripcion")?.setValue(noticiaEditar.texto);
    this.noticiaEditable = noticiaEditar; 
  }

  llenarForm2(integranteEditar:IntegranteTeam){
    this.formularioTeam.get("nombreIntegrante")?.setValue(integranteEditar.nombre);
    this.formularioTeam.get("cargoIntegrante")?.setValue(integranteEditar.cargo);
    this.formularioTeam.get("descripcionIntegrante")?.setValue(integranteEditar.descripcion);
    this.integranteEditar = integranteEditar;
  }

  capturarImagen(event:any){
    this.imagen = event.target.files[0];
    console.log(this.imagen);

    let reader = new FileReader();
    reader.readAsDataURL(this.imagen);
    reader.onload = (event:any) =>{
      this.imgenUrl = event.target.result;
    }
    
  }

}