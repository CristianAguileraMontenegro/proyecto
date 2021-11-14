import { Component, OnInit, Input } from '@angular/core';
import {IntegranteTeam} from '../../interfaces/integrante-team';

@Component({
  selector: 'app-team-pag',
  templateUrl: './team-pag.component.html',
  styleUrls: ['./team-pag.component.scss']
})
export class TeamPagComponent implements OnInit {
  @Input()

  integranteDeTeam:IntegranteTeam;

  constructor() {
    this.integranteDeTeam = {
      id:0, nombre:'',cargo:'',descripcion:'',descripcionFull:'',imagen:''
    };
   }

  ngOnInit(): void {
  }
}