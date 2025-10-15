import {Component, Input} from '@angular/core';
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {FormsModule} from "@angular/forms";
import {InputInterface, InputType, TextAreaInterface} from "../../classes/form.base-class";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-text-area-input',
  standalone: true,
  imports: [
    ErrorHandlingDirective,
    FormsModule,
    NgClass
  ],
  templateUrl: './text-area-input.component.html',
  styleUrl: './text-area-input.component.scss'
})
export class TextAreaInputComponent {

  @Input({required: true}) itemConfig!: TextAreaInterface | InputType;
  @Input({required: true}) ItemIndex!: number;
  @Input({required: true}) bindItemField: any;

}
