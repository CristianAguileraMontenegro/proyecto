import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './screens/login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RegistroComponent } from './screens/registro/registro.component';
import { PerfilComponent } from './screens/perfil/perfil.component';
import {InicioComponent} from './screens/inicio/inicio.component';
import { EdicionPerfilComponent } from './screens/edicion-perfil/edicion-perfil.component';
import { TeamPagComponent } from './componentes/team-pag/team-pag.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PerfilAdminComponent } from './screens/perfil-admin/perfil-admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {HttpClientModule} from '@angular/common/http';
import { PerfilPublicoViewComponent } from './screens/perfil-publico-view/perfil-publico-view.component';
import { NoticiaViewComponent } from './screens/noticia-view/noticia-view.component' //para conectar con back-end

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    EdicionPerfilComponent,
    TeamPagComponent,
    FilterPipe,
    PerfilAdminComponent,
    PerfilPublicoViewComponent,
    NoticiaViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
