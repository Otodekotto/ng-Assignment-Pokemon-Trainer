import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoggedinGuard } from './guards/auth-loggedin.guard';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [AuthLoggedinGuard],
  },
  {
    path: 'pokemon-catalogue',
    component: PokemonCataloguePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //import a module
  exports: [RouterModule], // exposde module and it's features
})
export class AppRoutingModule {}
