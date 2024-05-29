import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-circle-check',
  templateUrl: './circle-check.component.html',
  styleUrls: ['./circle-check.component.css']
})
export class CircleCheckComponent {
  isChecked: boolean = false;
  @Output() isCheckedChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  toggleChecked(event: Event) {
     event.stopPropagation(); 
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}