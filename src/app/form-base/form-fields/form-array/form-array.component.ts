import {Component, Input} from '@angular/core';
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {FormItemArray, InputType, Types} from "../../classes/form.base-class";
import {FormItemsComponent} from "../../form-items/form-items.component";
import {OnionTypeConflictHandlerPipe} from "../../pipe/onion-type-conflict-handler.pipe";

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [
    ErrorHandlingDirective,
    ReactiveFormsModule,
    FormItemsComponent,
    OnionTypeConflictHandlerPipe
  ],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {
  @Input({required: true}) itemConfig!: FormItemArray | InputType;
  @Input({required: true}) ItemIndex!: number;
  @Input({required: true}) bindItemField: any;
  protected readonly Types = Types;
}
