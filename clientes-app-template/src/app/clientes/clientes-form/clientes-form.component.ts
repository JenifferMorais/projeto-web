import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { MensagemService } from '../mensagensClientes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  alerta: boolean = false;
  mensagemAlerta: string;
  erros: String[];
  id: number;

  constructor(
    private service : ClientesService, 
    private mensagens : MensagemService, 
    private router: Router, 
    private activateRoute: ActivatedRoute) 
    {
    this.cliente = new Cliente();
    }

  ngOnInit(): void {
    let params = this.activateRoute.snapshot.params;

    // Verifique se 'id' está presente nos parâmetros
    if (params && params['id']) {
      this.id = params['id'];

      this.service.buscarPorId(this.id).subscribe((response) => {
       this.cliente = response;
      },(responseErro) => {
        this.cliente = new Cliente();
        this.iniciarAlertaErro(responseErro.error.erros);
      })
    }
}

  onSubmit(){
    if(this.id){
      this.editar();
    }else{
      this.salvar();
    }
  }

  editar(){
    this.service.editar(this.cliente).subscribe((response) => {
      this.iniciarAlerta('atualizacao');
    }, (responseErro) => {
      this.iniciarAlertaErro(responseErro.error.erros);
    })
  }

  salvar(){
    this.service.salvar(this.cliente).subscribe((response) => {
      this.cliente = response;
      this.iniciarAlerta('cadastro');
    }, (responseErro) => {
      this.iniciarAlertaErro(responseErro.error.erros);
    })
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

  iniciarAlertaErro(erro: string[]): void {
    this.erros = erro;
    this.time();
  }

  voltarListagem(){
    this.router.navigate(['/clientes']);
  }


}
