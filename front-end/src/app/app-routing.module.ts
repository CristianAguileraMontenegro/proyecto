import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './screens/inicio/inicio.component'; //importamos inicio
import {LoginComponent} from './screens/login/login.component';
import {RegistroComponent} from './screens/registro/registro.component';
import {PerfilComponent} from './screens/perfil/perfil.component';
import { EdicionPerfilComponent } from './screens/edicion-perfil/edicion-perfil.component';

const routes: Routes = [
  {path:"",redirectTo:"/inicio",pathMatch:"full"},
  {path:"inicio", component:InicioComponent},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"perfil/:id", component:PerfilComponent},
  {path:"edicion/:id", component:EdicionPerfilComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
