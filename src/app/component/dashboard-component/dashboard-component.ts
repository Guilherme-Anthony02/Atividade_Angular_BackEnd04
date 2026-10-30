import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-dashboard-component',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './dashboard-component.html',
    styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

    resumo = {
        clientes: 0,
        produtos: 0
    };

    erro = '';
    carregando = true;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.carregarIndicadores();
    }

    carregarIndicadores(): void {
        this.carregando = true;
        this.erro = '';

        forkJoin({
            clientes: this.http.get<any[]>(
                'https://localhost:7077/api/PessoaEndereco'
            ),

            produtos: this.http.get<any[]>(
                'https://localhost:7077/api/ProdutoItem'
            )
        })
        .pipe(
            finalize(() => {
                this.carregando = false;
            })
        )
        .subscribe({
            next: dados => {
                this.resumo = {
                    clientes: dados.clientes.length,
                    produtos: dados.produtos.length
                };
            },

            error: erro => {
                console.error(
                    'Erro ao carregar indicadores:',
                    erro
                );

                this.erro =
                    'Não foi possível carregar os indicadores. ' +
                    'Verifique se as APIs estão funcionando.';
            }
        });
    }
}
