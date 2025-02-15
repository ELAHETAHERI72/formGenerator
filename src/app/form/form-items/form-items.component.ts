import {Component, inject, Input, TemplateRef} from '@angular/core';
import {
  CustomItem,
  formArray,
  formGroups,
  inputTYpe,
  selectInterface,
  Types
} from '../models/interfaces/form-type.interface';
import {ControlContainer, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {SwitchButtonComponent} from '../../components/switch-button/switch-button.component';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {Observable, of} from 'rxjs';
import {Jalali} from "jalali-ts";
import {ErrorHandlingDirective} from "../directives/error-handling.directive";

@Component({
  selector: 'app-form-items',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    SwitchButtonComponent,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    ErrorHandlingDirective,
  ],
  templateUrl: './form-items.component.html',
  styleUrl: './form-items.component.scss',
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})

export class FormItemsComponent {

  _items: Array<inputTYpe> = [];
  _bindItems: any = {};
  ngForm = inject(NgForm);

  @Input() set bindItems(bindItem: any) {
    if (bindItem) {
      this._bindItems = bindItem;
    }
  };

  get bindItems() {
    return this._bindItems;
  }

  @Input() templateRefs!: Array<TemplateRef<any>>;

  Types = Types;

  protected ControlContainer = inject(ControlContainer);

  // ng-persian variables
  uiYearView: boolean = true;
  uiMonthView: boolean = true;

  uiTodayBtnEnable: boolean = true;

  @Input() set items(config: Array<inputTYpe>) {
    this._items = config;
  }

  get items() {
    return this._items;
  }

  returnArray(_t7: selectInterface | any): Observable<Array<any>> {
    if (_t7 && typeof _t7.fields.subscribe === 'function') {
      return _t7.fields;
    } else {
      return of(_t7.fields); // wrap the array in an Observable
    }

  }

  getFormGroup(_t7: formGroups | any) {
    return _t7.formItems;
  }

  getTemplate(item: CustomItem | any) {
    return item.template ? item.template : null;
  }

  getFormArray(item: formArray | inputTYpe, formField: string) {
    return (item as formArray)[formField as keyof formArray] ? (item as formArray)[formField as keyof formArray] : null;
  }

  protected readonly Jalali = Jalali;

  addFormItem(formItem: formArray | inputTYpe) {
    (formItem as formArray).addFormArrayField((formItem as formArray).formArrayFields as formGroups[]);
    let bindItemModel: any = {};
    Object.keys(this.bindItems[formItem.bindItem][0]).forEach(value => {

        bindItemModel[value] = undefined

      }
    );
    this.bindItems[formItem.bindItem].push(bindItemModel)

  }

  deleteFormArrayItemHandler(value: inputTYpe, formArrayItem: any, i: number) {
    let formItem: Array<formGroups> = this.getFormArray(value, 'formArrayFields')
    formItem.splice(i, 1);
    this.bindItems[value.bindItem].splice(i, 1);
  }
}
