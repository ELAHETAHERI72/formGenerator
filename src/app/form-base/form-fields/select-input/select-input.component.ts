import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {NgSelectComponent} from "@ng-select/ng-select";
import {ControlContainer, FormsModule, NgForm} from "@angular/forms";
import {InputInterface, InputType, SelectInterface} from "../../classes/form.base-class";
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

  @Input({required: true}) itemConfig!: SelectInterface ;
  @Input({required: true}) ItemIndex!: number;
  @Input({required: true})bindItemField: any;

  @Output() emitNewDomeItemFromOutside: EventEmitter<{ items: Array<InputType> }> = new EventEmitter();

  returnArray(_t7: SelectInterface | any): Observable<Array<any>> {
    if (_t7 && typeof _t7.fields.subscribe === 'function') {
      return _t7.fields;
    } else {
      return of(_t7.fields); // wrap the array in an Observable
    }

  }

  selectionChange(value: SelectInterface | InputType, event: HTMLInputElement) {
    if ((value as SelectInterface).addItemFromOutSide) { // if has input items from outside do this
      (value as SelectInterface).emitFormItems?.({items: this.items, $event: event});
      this.emitNewDomeItemFromOutside.emit({items: this.items})
    } else { // if a simple select without items from outside do this
      value.emitFormItems?.({bindItems: this.bindItemField, $event: event});

    }
  }

}
