import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AuthLoggedinGuard } from './guards/auth-loggedin.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    //components
    AppComponent,
    LoginPage,
    LoginFormComponent,
    HeaderComponent,
    PokemonCataloguePage,
    PokemonListComponent,
  ],
  imports: [
    //Module
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, AuthLoggedinGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
