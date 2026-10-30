import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../service/pedidos-service';

@Component({
  selector: 'app-admin-pedidos-component',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './admin-pedidos-component.html',
  styleUrl: './admin-pedidos-component.css',
})
export class AdminPedidosComponent implements OnInit {
  pedidos: any[] = [];
  situacao = '';
  erro = '';
  mensagem = '';
  carregando = false;

  constructor(private service: PedidosService) { }
  ngOnInit(): void { this.listar(); }

  listar(): void {
    this.carregando = true; this.erro = ''; this.mensagem = '';
    this.service.listar(this.situacao).subscribe({
      next: dados => { this.pedidos = dados; this.carregando = false; },
      error: () => { this.erro = 'Não foi possível carregar os pedidos.'; this.carregando = false; },
    });
  }

  atualizar(id: number, status: string): void {
    this.service.atualizarSituacao(id, status).subscribe({
      next: () => { this.mensagem = `Situação do pedido #${id} atualizada.`; this.listar(); },
      error: e => { this.erro = e?.error?.mensagem ?? 'Não foi possível alterar a situação.'; },
    });
  }
}
