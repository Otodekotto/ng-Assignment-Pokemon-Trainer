import {NgModule} from "@angular/core"
import { RouterModule , Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";

const routes: Routes = [
    {
        path:"",
        component: LoginPage
    }
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
