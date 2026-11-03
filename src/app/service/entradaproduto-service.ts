import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaProdutoService {

  private readonly api = 'https://localhost:7077/api/EntradaProduto';

  constructor(private http: HttpClient) {}

  registrar(dados: any): Observable<any> {
    return this.http.post<any>(this.api, dados);
  }
}