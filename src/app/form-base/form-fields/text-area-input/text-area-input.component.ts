import {Component, Input} from '@angular/core';
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {FormsModule} from "@angular/forms";
import {InputInterface, FormFieldType, TextAreaInterface} from "../../classes/form.base-class";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-text-area-input',
    imports: [
        ErrorHandlingDirective,
        FormsModule,
        NgClass
    ],
    templateUrl: './text-area-input.component.html',
    styleUrl: './text-area-input.component.scss'
})
export class TextAreaInputComponent {

  private _config!: TextAreaInterface;

  @Input({required: true}) set itemConfig(config: TextAreaInterface | FormFieldType) {
    this._config = config;
  };

  @Input({required: true}) ItemIndex!: number;
  @Input({required: true}) bindItemField: any;

  get config(): TextAreaInterface {
    return this._config;
  }

}
