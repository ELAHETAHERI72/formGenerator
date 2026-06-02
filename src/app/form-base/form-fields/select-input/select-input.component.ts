import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {NgSelectComponent} from "@ng-select/ng-select";
import {ControlContainer, FormsModule, NgForm} from "@angular/forms";
import {FormFieldType, SelectInterface, TextAreaInterface} from "../../classes/form.base-class";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorHandlingDirective,
    NgSelectComponent,
    NgClass,
    FormsModule
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {

  @Input({required: true}) ItemIndex!: number;
  @Input({required: true}) bindItemField: any;
  private _config!: SelectInterface;

  @Input({required: true}) set itemConfig(config: SelectInterface | FormFieldType) {
    this._config = config as SelectInterface;
  };

  get config(): SelectInterface {
    return this._config;
  }


  returnArray(_t7: SelectInterface | any): Observable<Array<any>> {
    if (_t7 && typeof _t7.fields.subscribe === 'function') {
      return _t7.fields;
    } else {
      return of(_t7.fields); // wrap the array in an Observable
    }

  }


}
