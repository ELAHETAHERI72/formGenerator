import {Component, Input, Type} from '@angular/core';
import {
  formConfig,
  inputInterface,
  selectInterface,
  Types
} from "../models/interfaces/form-type.interface";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {NgSelectModule
} from "@ng-select/ng-select";
import { SwitchButtonComponent } from "../../components/switch-button/switch-button.component";
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

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
],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

 private _formConfog!:formConfig;
  formItems: any;
  bindItems?: any={};

 @Input() set formConfig(config:formConfig ) {
     this._formConfog = config;
    //  (this.formItems as any) = config.items;

     this.createFormItems(config.items as Array<inputInterface>);
 }

get formConfig():formConfig {
   return this._formConfog;
}

  Types = Types;

   constructor() { }

  ngOnInit() { }

  returnArray(_t7: selectInterface |any) {        
    return _t7.fileds;
  }

  createFormItems(formItems:Array<inputInterface>) {
    if(formItems){
      formItems?.forEach((element:inputInterface) => {

        if(element.inputType ==Types.SWITCH_TYPE){

          this.bindItems[element?.bindItem!] = false;
        }
        else{

          this.bindItems[element?.bindItem!] = '';
        }

      });
      this.formConfig.submited?.(this.bindItems);

    }
  }

  submitApiCall() {
    this.formConfig.submited?.(this.bindItems);
  }

  }
