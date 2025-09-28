import {Component, Input} from '@angular/core';
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {ControlContainer, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {InputInterface, InputType} from "../../classes/form.base-class";
import {NgClass} from "@angular/common";
import {multicast} from "rxjs";

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ErrorHandlingDirective,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],

  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input({required: true}) itemConfig!: InputInterface |InputType ;
  @Input({required: true}) ItemIndex!: number;
  @Input({required: true})bindItemField: any;
}
