import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogoService } from '../../service/catalogo-service';
import { CarrinhoService } from '../../service/carrinho-service';
import { ProdutoCatalogo } from '../../models/produto-catalogo';

@Component({
  selector: 'app-catalogo-component',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './catalogo-component.html',
  styleUrl: './catalogo-component.css',
})
export class CatalogoComponent implements OnInit {
  produtos = signal<ProdutoCatalogo[]>([]);
  carregando = true;
  erro = '';
  mensagem = '';

  constructor(
    private catalogoService: CatalogoService,
    private carrinho: CarrinhoService,
  ) {}

  ngOnInit(): void {
    this.catalogoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos.filter((p) =>
          p.iditemNavigation?.ativoProdutoServico?.toUpperCase() !== 'N',
        ));
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar o catálogo. Confira se a API e o banco estão em execução.';
        this.carregando = false;
      },
    });
  }

  nomeProduto(produto: ProdutoCatalogo): string {
    return produto.iditemNavigation?.item1 ?? 'Item sem nome';
  }

  descricao(produto: ProdutoCatalogo): string {
    return produto.iditemNavigation?.descricaoItem ?? '';
  }

  preco(produto: ProdutoCatalogo): number {
    return Number(produto.precoVenda || produto.iditemNavigation?.preco || 0);
  }

  adicionarAoCarrinho(produto: ProdutoCatalogo): void {
    this.carrinho.adicionar(produto);
    this.mensagem = 'Produto adicionado ao carrinho.';
  }
}
