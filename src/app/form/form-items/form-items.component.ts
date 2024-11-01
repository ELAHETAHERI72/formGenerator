import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formGroups, inputTYpe, selectInterface, Types } from '../models/interfaces/form-type.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwitchButtonComponent } from '../../components/switch-button/switch-button.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
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
  styleUrl: './form-items.component.scss'
})

export class FormItemsComponent {

  _items: Array<inputTYpe> = [];
  @Input() bindItems?: any = {};

  Types = Types;

  @Input() set items(config: Array<inputTYpe>) {
    this._items = config;
  }

  get items() {
    return this._items;
  }

  returnArray(_t7: selectInterface | any) {
    return _t7.fileds;
  }

  getFormGroup(_t7: formGroups | any) {
    return _t7.formItems;
  }

}
