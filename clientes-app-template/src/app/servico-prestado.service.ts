import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servico-prestado-busca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {
  private apiUrl: string = `${environment.apiURL}/servicos-prestados/`;

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado>{
      return this.http.post<ServicoPrestado>(this.apiUrl, servicoPrestado);
  }

  listar(): Observable<ServicoPrestadoBusca[]> {
    return this.http.get<ServicoPrestadoBusca[]>(`${this.apiUrl}`.concat('listar'));
  }

  editar(servicoPrestado: ServicoPrestado, id: number) : Observable<ServicoPrestado> {
    return this.http.put<ServicoPrestado>(`${this.apiUrl}`+ id, servicoPrestado)
  }

  deletar(servicoPrestado: ServicoPrestadoBusca) : Observable<ServicoPrestado> {
    return this.http.delete<ServicoPrestado>(`${this.apiUrl}${servicoPrestado.id}`)
  }

  buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]> {
    const httpParams =  new HttpParams().set("nome", nome).set("mes", mes.toString());

    return this.http.get<ServicoPrestadoBusca[]>(this.apiUrl + "?" + httpParams.toString());
  }

  buscarPorId(id: number) : Observable<ServicoPrestado> {
    return this.http.get<ServicoPrestado>(`${this.apiUrl}`+ id)
  }

}
