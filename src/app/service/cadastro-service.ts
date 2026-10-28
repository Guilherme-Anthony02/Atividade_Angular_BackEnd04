import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root',
})

export class CadastroService {
  constructor(private http: HttpClient) {}

  adicionarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const urlApi = '';

    return this.http.post<Pessoa>(urlApi, pessoa);
  }

  listarPessoas(): Observable<Pessoa[]> {
    const urlApi = '';

    return this.http.get<Pessoa[]>(urlApi);
  }

  listarPessoa(idpessoa: number): Observable<Pessoa> {
    const urlApi = ``;

    return this.http.get<Pessoa>(urlApi);
  }

  excluirPessoa(pessoas: Pessoa): Observable<Pessoa> {
    const urlApi = ``;

    return this.http.delete<Pessoa>(urlApi);
  }


  alterarPessoa(produtos: Pessoa): Observable<Pessoa> {
    const urlApi = ``;

    return this.http.put<Pessoa>(urlApi, Pessoa);
  }
}