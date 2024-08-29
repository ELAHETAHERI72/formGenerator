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
  formItems!: Array<any>;

 @Input() set formConfig(config:formConfig ) {
     this._formConfog = config;
     (this.formItems as any) = config.items;

     this.createFormItems(this.formItems);
     this.formConfig.submited?.(this.formItems);
 }

get formConfig():formConfig {
   return this._formConfog;
}

  Types = Types;
 @Input() submitedFormValue$:Subject<any>= new Subject();

   constructor() { }

  ngOnInit() {
    this.submitedFormValue$.subscribe(res=>{
      this.formConfig?.submited?.(res);
     })
  }

  returnArray(_t7: selectInterface |any) {        
    return _t7.fileds;
  }

  createFormItems(formItems:Array<inputInterface>) {
    formItems.map(_v=>{
      switch (_v.inputType) {
        case Types.INPUT_TYPE:
          console.log(_v,'hhhhhhh');
          
          break;
      
        default:
          break;
      }
    })
  }

submitApiCall() {
  this.formConfig.submited?.(this.formConfig.items)
}
  
  }
