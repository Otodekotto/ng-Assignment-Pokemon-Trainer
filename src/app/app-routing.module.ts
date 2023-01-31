
import {NgModule} from "@angular/core"
import { RouterModule , Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { HeaderComponent } from './component/header/header.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';

const routes: Routes = [
    
    {
    path: '',
    component: HeaderComponent,
    },
    {
        path:"",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path:"login",
        component: LoginPage
    },
  {
    path: 'pokemon-catalogue',
    component: PokemonCataloguePage,
  },
  {
    path: 'profile',
    component: PokemonCataloguePage,
  },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], //import a module
    exports: [
        RouterModule
    ] // exposde module and it's features
})

export class AppRoutingModule{

}