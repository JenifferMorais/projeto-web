import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './servico-prestado-busca';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { MensagemService } from '../mensagensServicoPrestado';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {
  servicoSelecionado: ServicoPrestadoBusca;
  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];
  alerta: boolean = false;
  mensagemAlerta: string;
  erros: String[];

  constructor(private service: ServicoPrestadoService, private mensagens : MensagemService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
   }

  ngOnInit(): void {
   this.listar();
  }

  onSubmit(){
    this.service.buscar(this.nome, this.mes).subscribe(
      (response) => this.lista = response);
  }
  

  iniciarAlertaErro(erro: string[]): void {
    this.erros = erro;
    this.time;
  }
  
  finalizarAlerta(): void {
    this.alerta = false;
    this.mensagemAlerta = '';
    this.erros = [];
  }

  time(): void {
    setTimeout(() => {
      this.finalizarAlerta();
    }, 3000);
  }

  iniciarAlerta(tipo: string): void {
    this.mensagemAlerta = this.mensagens.sucesso(tipo);
    this.alerta = true;
    this.time();
  }

  preparaDelecao(servico: ServicoPrestadoBusca){
    this.servicoSelecionado = servico;
  }

  async excluir(servico: ServicoPrestadoBusca){
    this.iniciarAlerta('exclusao');
    this.lista = this.lista.filter(i => i !== servico);
    this.service.deletar(servico).subscribe((response) => {}, (responseErro) => {
     this.iniciarAlertaErro(responseErro.error.erros);
   })}

  listar(){
    this.service.listar().subscribe(
      (response) => {
        this.lista = response;
      });
  }

  limpar(){
    this.listar();
    this.nome = "";
    this.mes = null;
  }



}
