import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'switch-button',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss'
})
export class SwitchButtonComponent {

  @Input() labelName?:string;
  @Input() isChecked:boolean =false;
  @Input() id!:string ;
  @Output() emitValue = new EventEmitter<Boolean>();

  changeValue(event:any){
    this.emitValue.emit(event.target.checked);
  }
}
