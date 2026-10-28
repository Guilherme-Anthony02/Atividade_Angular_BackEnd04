import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../service/carrinho-service';
import { PedidosService } from '../../service/pedidos-service';

@Component({
  selector: 'app-pedidos-component',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, RouterLink],
  templateUrl: './pedidos-component.html',
  styleUrl: './pedidos-component.css',
})
export class PedidosComponent {
  idPessoa = '';
  idFuncionario = '';
  idConsulta = '';
  pedidos: any[] = [];
  pedidoSelecionado: any = null;
  mensagem = '';
  erro = '';
  carregando = false;

  constructor(public carrinho: CarrinhoService, private pedidosService: PedidosService) {}

  confirmar(): void {
    const cliente = Number(this.idPessoa);
    const funcionario = Number(this.idFuncionario);
    const itens = this.carrinho.listar();
    if (!Number.isInteger(cliente) || cliente <= 0 || !Number.isInteger(funcionario) || funcionario <= 0 || !itens.length) {
      this.erro = 'Informe um ID de cliente válido, um ID de funcionário válido e tenha itens no carrinho.';
      return;
    }
    this.erro = '';
    this.mensagem = '';
    this.carregando = true;
    this.pedidosService.criar({
      idPessoa: cliente,
      itens: itens.map(i => ({ idItem: i.produto.iditem, quantidade: i.quantidade, idFuncionario: funcionario })),
    }).subscribe({
      next: resposta => {
        this.carrinho.limpar();
        this.mensagem = `Pedido #${resposta.idPedido} registrado com sucesso. Situação inicial: aberto.`;
        this.carregando = false;
      },
      error: erro => {
        this.erro = erro?.error?.mensagem ?? 'Não foi possível registrar o pedido. Verifique os IDs e o estoque disponível.';
        this.carregando = false;
      },
    });
  }

  consultarCliente(): void {
    const id = Number(this.idConsulta);
    if (!Number.isInteger(id) || id <= 0) { this.erro = 'Informe um ID de cliente válido.'; return; }
    this.carregando = true;
    this.erro = '';
    this.pedidosService.listarDoCliente(id).subscribe({
      next: dados => { this.pedidos = dados; this.pedidoSelecionado = null; this.carregando = false; },
      error: erro => { this.pedidos = []; this.erro = erro?.error?.mensagem ?? 'Falha ao consultar pedidos.'; this.carregando = false; },
    });
  }

  verDetalhes(id: number): void {
    this.pedidosService.consultar(id).subscribe({
      next: pedido => { this.pedidoSelecionado = pedido; this.erro = ''; },
      error: () => { this.erro = 'Não foi possível carregar os detalhes do pedido.'; },
    });
  }
}
