export interface EnderecoPessoa {
  idEndereco?: number;
  cep: string;
  numero: string;
  complemento: string;
}

export class Pessoa {
  idPessoa = 0;
  nome = '';
  cpf = 0;
  dataNascimento = '';
  sexo = '';
  email = '';
  telefone = 0;
  ativoPessoa = 'S';
  enderecos: EnderecoPessoa[] = [];
}
