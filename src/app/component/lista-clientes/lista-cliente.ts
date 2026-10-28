import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../service/cadastro-service';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-lista-cliente',
  imports: [],
  templateUrl: './lista-cliente.html',
  styleUrl: './lista-cliente.css',
})
export class ListaPessoa {

  listaPessoa = signal<Pessoa[]>([]);

  constructor(
    private router: Router,
    private pessoaService: CadastroService
  ) {}

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas() {
    this.pessoaService.listarPessoas().subscribe({
      next: (dados) => {
        this.listaPessoa.set(
          [...dados].sort((a, b) => (a.nome || '').localeCompare(b.nome || ''))
        );
      },
      error: (msgErro) => {
        console.log('Erro ao listar as pessoas ', msgErro);
      },
    });
  }

  excluirPessoa(pessoa: Pessoa) {
    if (confirm(`Deseja excluir ${pessoa.nome} da lista?`)) {
      this.pessoaService.excluirPessoa(pessoa).subscribe({
        next: (dados) => {
          this.listaPessoa.update((elem) =>
            elem.filter((item) => item.idpessoa !== pessoa.idpessoa)
          );

          console.log('Pessoa excluída com sucesso ', dados);
        },
        error: (msgErro) => {
          console.log('Erro ao excluir a pessoa ', msgErro);
        },
      });
    }
  }

  buscarPessoa(pessoa: Pessoa) {
    this.router.navigate(['/cadastro', pessoa.idpessoa]);
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}