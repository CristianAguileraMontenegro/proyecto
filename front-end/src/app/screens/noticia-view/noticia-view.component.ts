import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from 'src/app/servicios/noticias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noticia-view',
  templateUrl: './noticia-view.component.html',
  styleUrls: ['./noticia-view.component.scss']
})
export class NoticiaViewComponent implements OnInit {
  listaNoticia:any = [];
  noticiaRecibida:number=0;
  noticiaActual:any;
  noticiasRandom:Array<any>=[];

  

  flag:boolean=false;
  imageInfos:Array<any> = [];

  constructor(private router:Router, private ruta:ActivatedRoute, private servicioNoticias:NoticiasService) {
    this.ruta.params.subscribe(datos => {
      this.noticiaRecibida= datos["id"];
    });
   }

  ngOnInit(): void {
    
    this.listaNoticia.length = 0;
    this.noticiasRandom.length=0;
    this.noticiaActual=0;
    this.obtenerImagenesNoticias();
    this.cargarNoticias();
  }

  cargarNoticias(){
    this.servicioNoticias.consultarNoticias().subscribe(Observador =>{
      for (let i = 0; i < Observador.items.length; i++) {
        for(let j = 0; j < this.imageInfos.length; j++)
        {
          if (this.imageInfos[j].name == Observador.items[i].imagenURL) {
            this.listaNoticia.push({titulo:Observador.items[i].titulo, texto:Observador.items[i].texto, id:Observador.items[i].id, imagenURL:this.imageInfos[j].url});
            if(Observador.items[i].id == this.noticiaRecibida){
              this.noticiaActual = {titulo:Observador.items[i].titulo, texto:Observador.items[i].texto, id:Observador.items[i].id, imagenURL:this.imageInfos[j].url};
            }
          }
        }
      }
      
      this.randomId();
      this.flag=true;
      
  });
  }

  obtenerImagenesNoticias(){
    this.servicioNoticias.getNoticiasFolder().subscribe(Observador =>{
      for(let i = 0; i < Observador.length; i++)
      {
        this.imageInfos.push(Observador[i]);
      }
    });
  }
  

  randomId(){

    let min = 0;
    let max = this.listaNoticia.length-1;
    let flag:boolean;
    let flag2:boolean = true;

  

    
    if(this.listaNoticia.length > 3){
      for(let i=0; i<3; i++){
        let random = Math.round(Math.random()*(max-min) + min);
        if(i == 0){
          this.noticiasRandom[i] = this.listaNoticia[random];
          
          for(let j = 0; j < this.imageInfos.length && flag2; j++){
            
            if (this.imageInfos[j].name == this.noticiasRandom[i].imagenURL){
              flag2= false;
              this.noticiasRandom[i].imagenURL= this.imageInfos[j].name;
            }
          }
        }else{
          flag = true;
          while(flag){ 
            flag = false;
            for(let j = 0; j < this.noticiasRandom.length; j++){
              if((this.noticiasRandom[j] == this.listaNoticia[random]) || (this.noticiasRandom[j] == this.noticiaActual)){
                flag = true;
              }
            }
            if(!flag){
              flag2=true;
              this.noticiasRandom[i] = this.listaNoticia[random];
              for(let j = 0; j < this.imageInfos.length && flag2; j++){
                if (this.imageInfos[j].name == this.noticiasRandom[i].imagenURL){
                  flag2= false;
                  this.noticiasRandom[i].imagenURL= this.imageInfos[j].name;
                }
              }
            }else{
              random = Math.round(Math.random()*(max-min) + min);
            }
          }
        }
      }
    }
  }

  llevarAVista(idNoticiaBuscada:any){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/noticiaView',idNoticiaBuscada]));
    
    
  }
}