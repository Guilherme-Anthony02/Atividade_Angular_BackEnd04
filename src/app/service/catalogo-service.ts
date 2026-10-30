import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoCatalogo } from '../models/produto-catalogo';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly urlApi = 'https://localhost:7077/api/ProdutoItem';

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<ProdutoCatalogo[]> {
    return this.http.get<ProdutoCatalogo[]>(this.urlApi);
  }
}
