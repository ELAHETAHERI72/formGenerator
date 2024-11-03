import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { formGroups, inputTYpe, selectInterface, Types } from '../models/interfaces/form-type.interface';
import {ControlContainer, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwitchButtonComponent } from '../../components/switch-button/switch-button.component';
import { IActiveDate, NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { isObservable, Observable, of } from 'rxjs';
import {ShowErrorComponent} from "../../components/show-error/show-error.component";

@Component({
  selector: 'app-form-items',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    CommonModule,
    NgSelectModule,
    SwitchButtonComponent,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    ShowErrorComponent,
  ],
  templateUrl: './form-items.component.html',
  styleUrl: './form-items.component.scss',
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})

export class FormItemsComponent {

  _items: Array<inputTYpe> = [];
  @Input() bindItems?: any = {};
  Types = Types;

  ControlContainer = inject(ControlContainer)

  // ng-persian variables
  uiYearView: boolean = true;
  uiMonthView: boolean = true;

  uiTodayBtnEnable: boolean = true;


  @Input() set items(config: Array<inputTYpe>) {
    this._items = config;
    console.log(this.ControlContainer,'ggggs');
  }

  get items() {
    return this._items;
  }

  returnArray(_t7: selectInterface | any): Observable<Array<any>> {

    if ( _t7 && typeof _t7.fields.subscribe === 'function') {
      return _t7.fields;
    } else {
      return of(_t7.fields); // wrap the array in an Observable
    }

  }

  getFormGroup(_t7: formGroups | any) {
    return _t7.formItems;
  }

}
