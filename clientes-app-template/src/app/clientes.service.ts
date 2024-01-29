import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl: string = `${environment.apiURL}/cliente/`;

  constructor(private http: HttpClient) {

   }

  getCliente(): Cliente {
  let cliente : Cliente = new Cliente();
  return cliente;
  }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}`, cliente)
  }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  editar(cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}`+ cliente.id, cliente)
  }

  deletar(cliente: Cliente) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}${cliente.id}`)
  }

  buscarPorId(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}`+ id)
  }

}
