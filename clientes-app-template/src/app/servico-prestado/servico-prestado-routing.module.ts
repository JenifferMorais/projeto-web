import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListaComponent } from './servico-prestado-lista/servico-prestado-lista.component';
import { MensagemService } from './mensagensServicoPrestado';


const routes: Routes = [
  {path: 'servico-prestado-form', component: ServicoPrestadoFormComponent},
  {path: 'servico-prestado-form/:id', component: ServicoPrestadoFormComponent},
  {path: 'servico-prestado-listagem', component: ServicoPrestadoListaComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MensagemService],
})
export class ServicoPrestadoRoutingModule { }
