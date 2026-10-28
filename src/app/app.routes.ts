import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home-component';
import { Cadastro } from './component/cadastro-component/cadastro-component';
import { ListaPessoa } from './component/lista-clientes/lista-cliente';
import { CatalogoComponent } from './component/catalogo-component/catalogo-component';
import { CarrinhoComponent } from './component/carrinho-component/carrinho-component';
import { EstoqueComponent } from './component/estoque-component/estoque-component';
import { PedidosComponent } from './component/pedidos-component/pedidos-component';
import { AdminPedidosComponent } from './component/admin-pedidos-component/admin-pedidos-component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: Cadastro },
  { path: 'cadastro/:id', component: Cadastro },
  { path: 'listapessoa', component: ListaPessoa },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'admin/pedidos', component: AdminPedidosComponent },
];
