import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstoqueItem } from '../models/estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private readonly api = 'https://localhost:7077/api/Estoque';

  constructor(private http: HttpClient) {}

  // Listar todos os produtos do estoque
  listar(): Observable<EstoqueItem[]> {
    return this.http.get<EstoqueItem[]>(this.api);
  }

  // Consultar um produto pelo ID
  consultar(id: number): Observable<EstoqueItem> {
    return this.http.get<EstoqueItem>(`${this.api}/${id}`);
  }
}