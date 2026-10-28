import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../models/pessoa';
import { CadastroService } from '../../service/cadastro-service';

@Component({
  selector: 'app-cadastro-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-component.html',
  styleUrl: './cadastro-component.css',
})
export class Cadastro implements OnInit {
  idPessoa = 0;
  nome = '';
  cpf = 0;
  dataNascimento = '';
  sexo = '';
  email = '';
  telefone = 0;
  ativoPessoa = 'S';
  cep = '';
  numero = '';
  complemento = '';
  editar = false;
  erro = '';
  mensagem = '';

  constructor(
    private cadastroService: CadastroService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.editar = true;
      this.carregaCampo(id);
    }
  }

  carregaCampo(idPessoa: number): void {
    this.cadastroService.listarPessoa(idPessoa).subscribe({
      next: (pessoa) => {
        this.idPessoa = pessoa.idPessoa;
        this.nome = pessoa.nome ?? '';
        this.cpf = pessoa.cpf ?? 0;
        this.dataNascimento = pessoa.dataNascimento ?? '';
        this.sexo = pessoa.sexo ?? '';
        this.email = pessoa.email ?? '';
        this.telefone = pessoa.telefone ?? 0;
        this.ativoPessoa = pessoa.ativoPessoa ?? 'S';
        const endereco = pessoa.enderecos?.[0];
        this.cep = endereco?.cep ?? '';
        this.numero = endereco?.numero ?? '';
        this.complemento = endereco?.complemento ?? '';
      },
      error: () => {
        this.erro = 'Não foi possível carregar os dados do cliente.';
      },
    });
  }

  enviaDadosPessoa(): void {
    this.erro = '';
    this.mensagem = '';

    if (!this.nome.trim() || !this.email.trim() || !this.sexo || !this.cpf) {
      this.erro = 'Preencha nome, CPF, sexo e e-mail.';
      return;
    }

    const pessoa = new Pessoa();
    pessoa.idPessoa = this.idPessoa;
    pessoa.nome = this.nome.trim();
    pessoa.cpf = Number(this.cpf);
    pessoa.dataNascimento = this.dataNascimento;
    pessoa.sexo = this.sexo;
    pessoa.email = this.email.trim();
    pessoa.telefone = Number(this.telefone);
    pessoa.ativoPessoa = this.ativoPessoa || 'S';
    if (this.cep.trim() && this.numero.trim()) {
      pessoa.enderecos = [{
        cep: this.cep.trim(),
        numero: this.numero.trim(),
        complemento: this.complemento.trim(),
      }];
    }

    const aoSalvar = () => {
      this.mensagem = this.editar
        ? 'Cliente alterado com sucesso!'
        : 'Cliente cadastrado com sucesso!';
      if (!this.editar) this.limparAtributos();
    };

    const aoFalhar = (erro: any) => {
      this.erro = erro?.status === 409
        ? 'Já existe um cliente com esse CPF ou e-mail.'
        : 'Não foi possível salvar o cliente. Verifique os dados e se a API está em execução.';
    };

    // Mantemos as chamadas separadas porque cada método retorna um Observable
    // com tipo diferente (Pessoa no POST e void no PUT).
    if (this.editar) {
      this.cadastroService.alterarPessoa(pessoa).subscribe({
        next: aoSalvar,
        error: aoFalhar,
      });
    } else {
      this.cadastroService.adicionarPessoa(pessoa).subscribe({
        next: aoSalvar,
        error: aoFalhar,
      });
    }
  }

  limparAtributos(): void {
    this.idPessoa = 0;
    this.nome = '';
    this.cpf = 0;
    this.dataNascimento = '';
    this.sexo = '';
    this.email = '';
    this.telefone = 0;
    this.ativoPessoa = 'S';
    this.cep = '';
    this.numero = '';
    this.complemento = '';
    this.editar = false;
  }

  voltarParaLista(): void {
    this.router.navigate(['/listapessoa']);
  }
}
