import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstoqueItem } from '../../models/estoque';
import { EstoqueService } from '../../service/estoque-service';

@Component({
  selector: 'app-estoque-component',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './estoque-component.html',
  styleUrl: './estoque-component.css',
})
export class EstoqueComponent implements OnInit {
  itens: EstoqueItem[] = [];
  idBusca = '';
  carregando = true;
  erro = '';

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.carregando = true;
    this.erro = '';
    this.estoqueService.listar().subscribe({
      next: dados => {
        this.itens = dados;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível consultar o estoque. Verifique se a API está em execução.';
        this.carregando = false;
      },
    });
  }

  buscar(): void {
    const id = Number(this.idBusca);
    if (!this.idBusca.trim() || !Number.isInteger(id) || id <= 0) {
      this.listar();
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.estoqueService.consultar(id).subscribe({
      next: item => {
        this.itens = [item];
        this.carregando = false;
      },
      error: erro => {
        this.itens = [];
        this.erro = erro?.status === 404
          ? 'Não existe produto com esse ID no estoque.'
          : 'Falha ao consultar o estoque.';
        this.carregando = false;
      },
    });
  }
}
