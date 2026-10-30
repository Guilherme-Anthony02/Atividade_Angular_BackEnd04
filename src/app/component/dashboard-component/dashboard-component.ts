import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin, finalize } from 'rxjs';

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

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Dashboard iniciado!');
    this.carregarIndicadores();
  }

  carregarIndicadores(): void {
    this.carregando = true;
    this.erro = '';

    console.log('Iniciando busca dos indicadores...');

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

          console.log('Carregamento finalizado!');

          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          console.log('Dados recebidos:', dados);

          this.resumo = {
            clientes: dados.clientes.length,
            produtos: dados.produtos.length
          };

          this.carregando = false;

          this.cdr.detectChanges();
        },

        error: (erro) => {
          console.error('Erro ao carregar indicadores:', erro);

          this.erro =
            'Não foi possível carregar os indicadores. ' +
            'Verifique se a API está funcionando.';

          this.carregando = false;

          this.cdr.detectChanges();
        }
      });
  }
}