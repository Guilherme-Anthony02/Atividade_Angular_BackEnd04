import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../service/carrinho-service';

@Component({
  selector: 'app-carrinho-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrinho-component.html',
  styleUrl: './carrinho-component.css',
})
export class CarrinhoComponent {
  mensagem = '';
  erro = '';

  constructor(public carrinho: CarrinhoService) { }

  alterarQuantidade(idItem: number, valor: string): void {
    const quantidade = Number(valor);
    if (!this.carrinho.alterarQuantidade(idItem, quantidade)) {
      this.erro = 'Informe uma quantidade inteira maior que zero.';
    } else {
      this.erro = '';
      this.mensagem = 'Quantidade atualizada.';
    }
  }

  remover(idItem: number): void {
    this.carrinho.remover(idItem);
    this.mensagem = 'Item removido do carrinho.';
    this.erro = '';
  }
}
