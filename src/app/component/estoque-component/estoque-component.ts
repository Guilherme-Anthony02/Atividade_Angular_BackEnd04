import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstoqueItem } from '../../models/estoque';
import { EstoqueService } from '../../service/estoque-service';

@Component({
  selector: 'app-estoque-component',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './estoque-component.html',
  styleUrl: './estoque-component.css',
})
export class EstoqueComponent implements OnInit {
  itens: EstoqueItem[] = [];
  idBusca: string | number = '';
  carregando = false;
  erro = '';

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.carregando = true;
    this.erro = '';

    this.estoqueService.listar().subscribe({
      next: (dados) => {
        console.log('Dados recebidos da API:', dados);
        console.log('Quantidade de produtos:', dados.length);

        this.itens = dados;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao listar estoque:', erro);

        this.itens = [];
        this.erro = 'Não foi possível consultar o estoque. Verifique se a API está funcionando.';
        this.carregando = false;
      },
    });
  }

  buscar(): void {
    const texto = String(this.idBusca ?? '').trim();

    if (texto === '') {
      this.listar();
      return;
    }

    const id = Number(texto);

    if (!Number.isInteger(id) || id <= 0) {
      this.erro = 'Digite um ID válido.';
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.estoqueService.consultar(id).subscribe({
      next: (item) => {
        this.itens = [item];
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao consultar produto:', erro);

        this.itens = [];

        if (erro.status === 404) {
          this.erro = 'Não existe produto com esse ID no estoque.';
        } else {
          this.erro = 'Falha ao consultar o estoque. Verifique a API.';
        }

        this.carregando = false;
      },
    });
  }

  listarTodos(): void {
    this.idBusca = '';
    this.listar();
  }
}