import {Component, EventEmitter, forwardRef, Input, Output, Type} from '@angular/core';
import {
  formConfig,
  inputTYpe,
  selectInterface,
  Types
} from "../models/interfaces/form-type.interface";
import {ControlContainer, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {
  NgSelectModule
} from "@ng-select/ng-select";
import {SwitchButtonComponent} from "../../components/switch-button/switch-button.component";
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {FormItemsComponent} from "../form-items/form-items.component";
import {Token} from "@angular/compiler";

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
    forwardRef(() => FormItemsComponent)
  ],

  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',

})

export class FormComponent {

  private _formConfig!: formConfig;
  formItems: any;
  bindItems?: any = {};

  @Output() submitCall = new EventEmitter();

  deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  @Input() set formConfig(config: formConfig) {
    this._formConfig = config;
    this.createFormItems(this.deepClone(config.items) as Array<inputTYpe>);
  }

  get formConfig(): formConfig {
    return this._formConfig;
  }


  submitApiForm(form: NgForm) {
    // this.formConfig.submited?.(this.bindItems);
    // this.submitCall.emit(this.bindItems);
    this.formConfig.submited?.(this.deepClone(this.bindItems));

  }


  createFormItems(formItems: Array<inputTYpe>) {
    this.bindItems = {};
    if (formItems) {

      formItems?.forEach((element: inputTYpe) => {

        if (element.inputType == Types.SWITCH_TYPE) {

          this.bindItems[element?.bindItem!] = false;
        } else if (element.inputType == Types.FORM_GROUP) {
          this.bindItems[element.bindItem] = {}
        } else {

          this.bindItems[element?.bindItem!] = '';
        }

      });
      this.formConfig.submited?.(this.deepClone(this.bindItems));

    }

  }

}
