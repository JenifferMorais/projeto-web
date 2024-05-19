import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { MensagemService } from '../mensagensClientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clienteSelecionado: Cliente;
  clientes: Cliente[];
  alerta: boolean = false;
  mensagemAlerta: string;
  erros: String[];

  constructor(private service : ClientesService, private mensagem: MensagemService, private router: Router,  private mensagens: MensagemService) { 
  }

  ngOnInit(): void {
    this.service.listar().subscribe(
      (response) => {
        this.clientes = response;
      });
  }

  async excluir(cliente: Cliente){
   this.iniciarAlerta('exclusao');
   this.clientes = this.clientes.filter(i => i !== cliente);
   this.service.deletar(cliente).subscribe((response) => {}, (responseErro) => {
    this.iniciarAlertaErro(responseErro.error.erros);
  })}

  novoCadastro(){
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
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

}
