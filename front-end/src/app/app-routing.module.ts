import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './screens/inicio/inicio.component'; //importamos inicio
import {LoginComponent} from './screens/login/login.component';
import {RegistroComponent} from './screens/registro/registro.component'

const routes: Routes = [
  {path:"",redirectTo:"/inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
