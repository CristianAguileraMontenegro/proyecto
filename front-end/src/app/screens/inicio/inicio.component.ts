import { Component, OnInit } from '@angular/core';
import {IntegranteTeam} from '../../interfaces/integrante-team';
import {listaArtistas} from '../../interfaces/artistas';
import {Obras} from '../../interfaces/obras';
import {AdminService} from '../../servicios/admin.service';
import {adminPrueba} from '../../interfaces/admin';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public arregloDeTeam: IntegranteTeam[];

  artistas = listaArtistas;

  filterArtista ='';


  constructor(private servicioAdmin:AdminService) {
    this.arregloDeTeam = [
      {"id":1,"nombre":"Samel Lalonde","cargo":"Diseñador",
      "descripcion":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "descripcionFull":"sdhfkjsdhfkjsdhfksjdhf","imagen":"6GCOIWKVBZEOZL5TDFMY65TAYQ.jpeg"},
      {"id":2,"nombre":"Ford Scavo","cargo":"Diseñador",
      "descripcion":"dsfskdjfhksjdfhsd",
      "descripcionFull":"sdhfkjsdhfkjsdhfksjdhf","imagen":"model-gdc5d0aad1_1280.jpg"},
      {"id":3,"nombre":"Anitta Ritta","cargo":"Artista",
      "descripcion":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "descripcionFull":"sdhfkjsdhfkjsdhfksjdhf","imagen":"naomi-scott-4k-large-for-desktop-wallpaper-preview.jpeg"},
    ]
  }

  ngOnInit(): void {
    this.servicioAdmin.consultarAdmin().subscribe(Observador=>{
      for (let i = 0; i < Observador.length; i++) 
      {
        adminPrueba.id = Observador[i].id_Admin;
        adminPrueba.correo = Observador[i].correo;
        adminPrueba.contrasena = Observador[i].contraseña;
      }
    })
    

  }

}