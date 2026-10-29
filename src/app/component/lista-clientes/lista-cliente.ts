import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../service/cadastro-service';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-lista-cliente',
  standalone: true,
  imports: [],
  templateUrl: './lista-cliente.html',
  styleUrl: './lista-cliente.css',
})
export class ListaPessoa implements OnInit {
  listaPessoa = signal<Pessoa[]>([]);
  erro = '';

  constructor(
    private router: Router,
    private pessoaService: CadastroService,
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  listarPessoas(): void {
    this.erro = '';
    this.pessoaService.listarPessoas().subscribe({
      next: (dados) => {
        this.listaPessoa.set(
          [...dados].sort((a, b) => (a.nome || '').localeCompare(b.nome || '')),
        );
      },
      error: () => {
        this.erro = 'Não foi possível carregar os clientes.';
      },
    });
  }

  excluirPessoa(pessoa: Pessoa): void {
    if (!confirm(`Deseja excluir ${pessoa.nome} da lista?`)) return;

    this.pessoaService.excluirPessoa(pessoa).subscribe({
      next: () => this.listaPessoa.update((lista) =>
        lista.filter((item) => item.idPessoa !== pessoa.idPessoa),
      ),
      error: () => {
        this.erro = 'Não foi possível excluir o cliente.';
      },
    });
  }

  buscarPessoa(pessoa: Pessoa): void {
    this.router.navigate(['/cadastro', pessoa.idPessoa]);
  }

  voltarParaHome(): void {
    this.router.navigate(['/home']);
  }
}
