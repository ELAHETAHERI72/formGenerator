import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import {
  formConfig,
  inputTYpe,
  selectInterface,
  Types
} from "../models/interfaces/form-type.interface";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, JsonPipe, NgIf } from "@angular/common";
import {
  NgSelectModule
} from "@ng-select/ng-select";
import { SwitchButtonComponent } from "../../components/switch-button/switch-button.component";
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormItemsComponent } from "../form-items/form-items.component";

@Component({
  selector: 'app-form',
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
    FormItemsComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

  private _formConfog!: formConfig;
  formItems: any;
  bindItems?: any = {};
  @Output() callSubmitApi = new EventEmitter();

  @Input() set formConfig(config: formConfig) {
    this._formConfog = config;
    this.createFormItems(config.items as Array<inputTYpe>);
  }

  get formConfig(): formConfig {
    return this._formConfog;
  }

  Types = Types;

  constructor() { }

  ngOnInit() { }

  returnArray(_t7: selectInterface | any) {
    return _t7.fileds;
  }

  getFormGroup(_t9: selectInterface | any): formConfig {
    return _t9.formGroups;
  }

  submitApiCall(form: NgForm) {
    this.formConfig.submited?.(this.bindItems);
    this.callSubmitApi.emit(this.bindItems);
  }

  createFormItems(formItems: Array<inputTYpe>) {
    if (formItems) {
      formItems?.forEach((element: inputTYpe) => {

        if (element.inputType == Types.SWITCH_TYPE) {

          this.bindItems[element?.bindItem!] = false;
        }
        else if (element.inputType == Types.FORM_GROUP) {
          this.bindItems[element.bindItem] = {}
        }
        else {

          this.bindItems[element?.bindItem!] = '';
        }

      });
      this.formConfig.submited?.(this.bindItems);
      this.callSubmitApi.emit(this.bindItems);

    }
  }

}
