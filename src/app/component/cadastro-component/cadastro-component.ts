import { ChangeDetectorRef, Component } from '@angular/core';
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

export class Cadastro {
    idpessoa = 0;
    nome = '';
    cpf = 0;
    data_nascimento = '';
    sexo = '';
    email = '';
    telefone = 0;
    ativo_pessoa = '';

    editar = false;
    idPessoa = 0;


  constructor(
    private cadastroService: CadastroService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.idPessoa = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idPessoa > 0) {
      this.editar = true;
      this.carregaCampo(this.idPessoa);
    }
  }

  exibeDados() {
    console.log(this.idpessoa, this.nome, this.cpf, this.data_nascimento, this.sexo, this.email, this.telefone, this.ativo_pessoa);
  }

  carregaCampo(idPessoa: number) {
    this.cadastroService.listarPessoa(idPessoa).subscribe({
      next: (objPessoa) => {
        this.idPessoa = objPessoa.idpessoa || idPessoa;
        this.nome = objPessoa.nome;
        this.cpf = objPessoa.cpf;
        this.data_nascimento = objPessoa.data_nascimento;
        this.sexo = objPessoa.sexo;
        this.email = objPessoa.email;
        this.telefone = objPessoa.telefone;

        this.cdr.detectChanges();
      },
      error: (msgErro) => {
        console.log('Erro ao listar a pessoa ', msgErro);
      },
    });
  }

  enviaDadosPessoa() {
    const pessoaParaSalvar = new Pessoa();

    pessoaParaSalvar.idpessoa = this.idpessoa;
    pessoaParaSalvar.nome = this.nome;
    pessoaParaSalvar.cpf = this.cpf;
    pessoaParaSalvar.data_nascimento = this.data_nascimento;
    pessoaParaSalvar.sexo = this.email;
    pessoaParaSalvar.telefone = this.telefone;

    if (this.editar) {
      pessoaParaSalvar.idpessoa = this.idPessoa;

      this.cadastroService.alterarPessoa(pessoaParaSalvar).subscribe({
        next: (resposta) => {
          console.log('Pessoa alterada com sucesso', resposta);
        },
        error: (msgErro) => {
          console.log('Erro ao alterar a pessoa ', msgErro);
        },
      });
    } else {
      this.cadastroService.adicionarPessoa(pessoaParaSalvar).subscribe({
        next: (resposta) => {
          console.log('Pessoa cadastrada com sucesso', resposta);
        },
        error: (msgErro) => {
          console.log('Erro ao cadastrar a pessoa ', msgErro);
        },
      });
    }

    this.limparAtributos();
  }

  listaPessoa(idPessoa: number) {
    this.cadastroService.listarPessoa(idPessoa).subscribe({
      next: (dados) => {
        console.table(dados);
      },
      error: (msgErro) => {
        console.log('Erro ao listar pessoas ', msgErro);
      },
    });
  }

  limparAtributos() {
    this.idpessoa = 0;
    this.nome = '';
    this.cpf = 0;
    this.data_nascimento = '';
    this.sexo = '';
    this.email = '';
    this.telefone = 0;
    this.ativo_pessoa = ''
    this.editar = false;
  }

  voltarParaLista() {
    this.router.navigate(['/listaproduto']);
  }
}


