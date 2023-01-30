import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PokemonCataloguePage],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
