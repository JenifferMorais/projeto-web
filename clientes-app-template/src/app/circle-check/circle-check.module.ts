import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CircleCheckComponent } from './circle-check.component';
import { TooltipModule } from '../tooltip/tooltip.module';


@NgModule({
    declarations: [CircleCheckComponent],
    imports: [CommonModule,
        TooltipModule
    ],
    exports: [CircleCheckComponent]
  })
export class CircleCheckModule { }
