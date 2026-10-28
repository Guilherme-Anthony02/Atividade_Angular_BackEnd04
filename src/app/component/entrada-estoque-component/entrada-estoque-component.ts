import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({selector:'app-entrada-estoque-component',standalone:true,imports:[FormsModule,RouterLink],templateUrl:'./entrada-estoque-component.html',styleUrl:'./entrada-estoque-component.css'})
export class EntradaEstoqueComponent {
 idItem=''; quantidade=''; dataEntrada=new Date().toISOString().slice(0,10); valorUnitario=''; unidade='UN'; mensagem=''; erro=''; carregando=false;
 constructor(private http:HttpClient){}
 registrar():void {
  if(Number(this.idItem)<=0||Number(this.quantidade)<=0||Number(this.valorUnitario)<=0||!this.dataEntrada||!this.unidade.trim()){this.erro='Preencha todos os campos com valores válidos.';return;}
  this.erro='';this.mensagem='';this.carregando=true;
  this.http.post<any>('http://localhost:5295/api/MovimentacaoEstoque/entrada',{idItem:Number(this.idItem),quantidade:Number(this.quantidade),dataEntrada:this.dataEntrada,valorUnitario:Number(this.valorUnitario),unidade:this.unidade}).subscribe({
   next:r=>{this.mensagem=r?.mensagem??'Entrada registrada.';this.quantidade='';this.valorUnitario='';this.carregando=false;},
   error:e=>{this.erro=e?.error?.mensagem??'Falha ao registrar entrada.';this.carregando=false;}
  });
 }
}