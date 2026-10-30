import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstoqueItem } from '../models/estoque';

@Injectable({ providedIn: 'root' })
export class EstoqueService {
  private readonly api = '';

  constructor(private http: HttpClient) {}

  listar(): Observable<EstoqueItem[]> {
    return this.http.get<EstoqueItem[]>(this.api);
  }

  consultar(id: number): Observable<EstoqueItem> {
    return this.http.get<EstoqueItem>(`${this.api}/${id}`);
  }
}
