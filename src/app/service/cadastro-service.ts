import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private readonly urlApi = 'http://localhost:5295/api/PessoaEndereco';

  constructor(private http: HttpClient) {}

  adicionarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.urlApi, pessoa);
  }

  listarPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.urlApi);
  }

  listarPessoa(idPessoa: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.urlApi}/${idPessoa}`);
  }

  excluirPessoa(pessoa: Pessoa): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${pessoa.idPessoa}`);
  }

  alterarPessoa(pessoa: Pessoa): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${pessoa.idPessoa}`, pessoa);
  }
}
