import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard-component',
    standalone: true,
    imports: [
        CurrencyPipe,
        RouterLink
    ],
    templateUrl: './dashboard-component.html',
    styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

    resumo = {
        clientes: 0,
        produtos: 0,
        servicos: 0,
        pedidos: 0,
        estoqueUnidades: 0,
        valorEstoque: 0
    };

    erro = '';
    carregando = true;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        forkJoin({
            clientes: this.http.get<any[]>(
                'http://localhost:5295/api/PessoaEndereco'
            ),

            produtos: this.http.get<any[]>(
                'http://localhost:5295/api/ProdutoItem'
            ),

            servicos: this.http.get<any[]>(
                'http://localhost:5295/api/Servico'
            ),

            pedidos: this.http.get<any[]>(
                'http://localhost:5295/api/Pedidos'
            ),

            estoque: this.http.get<any[]>(
                'http://localhost:5295/api/Estoque'
            )
        }).subscribe({
            next: dados => {
                this.resumo = {
                    clientes: dados.clientes.length,
                    produtos: dados.produtos.length,
                    servicos: dados.servicos.length,
                    pedidos: dados.pedidos.length,

                    estoqueUnidades: dados.estoque.reduce(
                        (soma, item) =>
                            soma + Number(item.quantidadeEstoque || 0),
                        0
                    ),

                    valorEstoque: dados.estoque.reduce(
                        (soma, item) =>
                            soma +
                            Number(item.quantidadeEstoque || 0) *
                            Number(item.precoVenda || item.preco || 0),
                        0
                    )
                };

                this.carregando = false;
            },

            error: () => {
                this.erro =
                    'Não foi possível carregar todos os indicadores. ' +
                    'Verifique se a API está ativa.';

                this.carregando = false;
            }
        });
    }
}