import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho';
import { ProdutoCatalogo } from '../models/produto-catalogo';

const CHAVE_CARRINHO = 'minha-loja-carrinho';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private itens: ItemCarrinho[] = this.carregar();

  listar(): ItemCarrinho[] {
    return [...this.itens];
  }

  quantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  valorTotal(): number {
    return this.itens.reduce(
      (total, item) => total + this.preco(item.produto) * item.quantidade,
      0,
    );
  }

  adicionar(produto: ProdutoCatalogo): void {
    const existente = this.itens.find(item => item.produto.iditem === produto.iditem);
    if (existente) {
      existente.quantidade += 1;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
    this.salvar();
  }

  alterarQuantidade(idItem: number, quantidade: number): boolean {
    if (!Number.isInteger(quantidade) || quantidade < 1) return false;
    const item = this.itens.find(i => i.produto.iditem === idItem);
    if (!item) return false;
    item.quantidade = quantidade;
    this.salvar();
    return true;
  }

  remover(idItem: number): void {
    this.itens = this.itens.filter(item => item.produto.iditem !== idItem);
    this.salvar();
  }

  limpar(): void {
    this.itens = [];
    this.salvar();
  }

  preco(produto: ProdutoCatalogo): number {
    return Number(produto.precoVenda || produto.iditemNavigation?.preco || 0);
  }

  private carregar(): ItemCarrinho[] {
    try {
      const salvo = localStorage.getItem(CHAVE_CARRINHO);
      return salvo ? JSON.parse(salvo) as ItemCarrinho[] : [];
    } catch {
      return [];
    }
  }

  private salvar(): void {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(this.itens));
  }
}
