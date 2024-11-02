import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formGroups, inputTYpe, selectInterface, Types } from '../models/interfaces/form-type.interface';
import {ControlContainer, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwitchButtonComponent } from '../../components/switch-button/switch-button.component';
import { IActiveDate, NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { isObservable, Observable, of } from 'rxjs';


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
  ],
  templateUrl: './form-items.component.html',
  styleUrl: './form-items.component.scss',
  providers: [{provide: ControlContainer, useExisting: NgForm}]
})

export class FormItemsComponent {

  _items: Array<inputTYpe> = [];
  @Input() bindItems?: any = {};

  Types = Types;

  // ng-select variables
  uiIsVisible: boolean = true;
  // uiTheme: IDatepickerTheme = defaultTheme;
  uiYearView: boolean = true;
  uiMonthView: boolean = true;
  uiHideAfterSelectDate: boolean = false;
  uiHideOnOutsideClick: boolean = false;
  uiTodayBtnEnable: boolean = true;

  timeEnable: boolean = true;
  timeShowSecond: boolean = true;
  timeMeridian: boolean = false;

  private _theme: string = 'default';

  onSelect(date: IActiveDate) {
    console.log(date);
  }
  @Input() set items(config: Array<inputTYpe>) {
    this._items = config;
  }

  get items() {
    return this._items;
  }

  returnArray(_t7: selectInterface | any): Observable<Array<any>> {   
        
    if ( _t7 && typeof _t7.fileds.subscribe === 'function') {  
      return _t7.fileds;  
    } else {  
      return of(_t7.fileds); // wrap the array in an Observable  
    }  

  }

  getFormGroup(_t7: formGroups | any) {
    return _t7.formItems;
  }

}
