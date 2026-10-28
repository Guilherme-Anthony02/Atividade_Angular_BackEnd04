import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { Cadastro } from './component/cadastro-component/cadastro-component';
import { ListaPessoa } from './component/lista-clientes/lista-cliente';
import { CatalogoComponent } from './component/catalogo-component/catalogo-component';

export const routes: Routes = [
    {
        path: "",
        redirectTo:"/home",
        pathMatch: "full"
    },

    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "cadastro",
        component: Cadastro
    },
    {
        path: "cadastro/:id",
        component: Cadastro
    },
    {
        path: "listapessoa",
        component: ListaPessoa
    },
    {
        path: "catalogo",
        component: CatalogoComponent
    }
];
