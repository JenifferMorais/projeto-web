import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class MensagemService {

    private mensagemSucesso = "Sucesso!";

    constructor() {}

    getSucesso(): string {
      return this.mensagemSucesso;
    }

    sucesso(tipo: string): string {
      switch (tipo) {
        case 'cadastro':
          return 'Cadastrado com sucesso!';
        case 'atualizacao':
          return 'Atualizado com sucesso!';
        case 'exclusao':
          return 'Excluido com sucesso!';
        case 'salvo':
          return 'Salvo com sucesso!';
        default:
          return 'Operação realizada com sucesso!';
      }
    }
  
  }