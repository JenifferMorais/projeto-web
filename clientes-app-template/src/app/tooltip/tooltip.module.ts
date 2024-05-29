// src/app/tooltip/tooltip.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule],
  exports: [TooltipComponent]
})
export class TooltipModule { }
