import {Component, Input} from '@angular/core';
import {
  formConfig,
  inputInterface,
  selectInterface,
  Types
} from "../models/interfaces/form-type.interface";
import {FormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {NgSelectModule
} from "@ng-select/ng-select";
import { SwitchButtonComponent } from "../../components/switch-button/switch-button.component";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    CommonModule,
    NgSelectModule,
    SwitchButtonComponent
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
      formItems?.forEach((element:any) => {

        this.bindItems[element?.bindItem!] = '';

      });
      this.formConfig.submited?.(this.bindItems);

    }
  }

submitApiCall() {
  this.formConfig.submited?.(this.bindItems);
}
  
  }
