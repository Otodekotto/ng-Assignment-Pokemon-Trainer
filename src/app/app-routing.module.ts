import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: 'pokemon-catalogue',
    component: PokemonCataloguePage,
  },
  {
    path: 'profile',
    component: PokemonCataloguePage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //import a module
  exports: [RouterModule], //expose module
})
export class AppRoutingModule {}
