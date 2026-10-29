import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PedidoCheckout {
    idPessoa: number;

    itens: {
        idItem: number;
        quantidade: number;
        idFuncionario: number;
    }[];
}

@Injectable({
    providedIn: 'root'
})
export class PedidosService {

    private readonly api = 'http://localhost:5295/api/Pedidos';

    constructor(
        private http: HttpClient
    ) { }

    listar(situacao = ''): Observable<any[]> {
        const url = situacao
            ? `${this.api}?situacao=${encodeURIComponent(situacao)}`
            : this.api;

        return this.http.get<any[]>(url);
    }

    consultar(id: number): Observable<any> {
        return this.http.get<any>(
            `${this.api}/${id}`
        );
    }

    listarDoCliente(id: number): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.api}/cliente/${id}`
        );
    }

    criar(dto: PedidoCheckout): Observable<any> {
        return this.http.post<any>(
            this.api,
            dto
        );
    }

    atualizarSituacao(
        id: number,
        situacao: string
    ): Observable<void> {
        return this.http.patch<void>(
            `${this.api}/${id}/situacao`,
            { situacao }
        );
    }
}