import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { MensagemService } from '../mensagensServicoPrestado';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  alerta: boolean = false;
  mensagemAlerta: string;
  erros: String[];
  id: number;
  nomeCliente: String;

  constructor(private service: ServicoPrestadoService, private clienteService: ClientesService, private mensagens : MensagemService, 
    private activateRoute: ActivatedRoute, private router: Router) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService.listar().subscribe( response => this.clientes = response);
    let params = this.activateRoute.snapshot.params;

    // Verifique se 'id' está presente nos parâmetros
    if (params && params['id']) {
      this.id = params['id'];

      this.service.buscarPorId(this.id).subscribe((response) => {
      this.servico = response;
      this.nomeCliente = response.cliente.nome;
      },(responseErro) => {
        this.servico = new ServicoPrestado();
        this.iniciarAlertaErro(responseErro.error.erros);
      })
    }
    console.log(this.servico)
  }

  onSubmit(){
    this.service.salvar(this.servico).subscribe(response => {
      this.iniciarAlerta('salvo');
      this.servico = new ServicoPrestado();
    }, (responseErro) => {
      this.iniciarAlertaErro(responseErro.error.erros);
      console.log(responseErro)
    })
  }

  editar(){
    console.log(this.servico)
    this.service.editar(this.servico, this.id).subscribe((response) => {
      this.iniciarAlerta('atualizacao');
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
    this.router.navigate(['/servico-prestado/listagem']);
  }

}
