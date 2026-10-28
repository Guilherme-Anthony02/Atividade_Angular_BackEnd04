import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({selector:'app-servicos-component',standalone:true,imports:[CurrencyPipe,FormsModule,RouterLink],templateUrl:'./servicos-component.html',styleUrl:'./servicos-component.css'})
export class ServicosComponent implements OnInit {
 servicos:any[]=[]; pesquisa=''; idBusca=''; erro=''; carregando=true;
 constructor(private http:HttpClient){}
 ngOnInit():void{this.listar();}
 listar():void{this.carregando=true;this.erro='';this.http.get<any[]>('http://localhost:5295/api/Servico').subscribe({next:d=>{this.servicos=d.filter(s=>s.ativo!=='N');this.carregando=false;},error:()=>{this.erro='Não foi possível carregar os serviços.';this.carregando=false;}});}
 consultarId():void{const id=Number(this.idBusca);if(!Number.isInteger(id)||id<=0){this.listar();return;}this.carregando=true;this.erro='';this.http.get<any>('http://localhost:5295/api/Servico/'+id).subscribe({next:s=>{this.servicos=s.ativo==='N'?[]:[s];this.carregando=false;},error:e=>{this.servicos=[];this.erro=e?.status===404?'Serviço não encontrado.':'Falha ao consultar serviço.';this.carregando=false;}});}
 filtrados():any[]{const t=this.pesquisa.trim().toLocaleLowerCase('pt-BR');return this.servicos.filter(s=>(s.nome??'').toLocaleLowerCase('pt-BR').includes(t));}
}