import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { MensagemService } from './mensagensClientes.service';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  { path: 'clientes-form', component: ClientesFormComponent},
  { path: 'clientes-form/:id', component: ClientesFormComponent},
  { path: 'clientes', component: ClientesListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MensagemService],
})
export class ClientesRoutingModule { }
