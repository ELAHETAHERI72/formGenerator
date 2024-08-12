import {Component} from '@angular/core';
import {
  formConfig,
  formItemBase,
  inputInterface,
  selectInterface, textAreaInterface,
  Types
} from "../models/interfaces/form-type.interface";
import {Observable, Subject} from "rxjs";
import {FormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {type} from "node:os";
import {NgSelectModule
} from "@ng-select/ng-select";



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    CommonModule,
    NgSelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  submitApi$!:Observable<any>| Subject<any>;

  formConfig:formConfig = new formConfig();
  private firstName: any | string;
   constructor() {
      this.formConfig = {
        items: [
          {
            inputTypeItem: new inputInterface({bindItem:this.firstName}),
            id:'name',
            labelName:'نام',
            placeholder:'firstName',
            name:'firstName',
            inputType:Types.INPUT_TYPE
          },

          {
            inputTypeItem:new selectInterface( {fileds: [{id: 1, value: 'test'}]}) ,
            id:'type',
            labelName:'نوع',
            placeholder:'type',
            name:'type',
            inputType:Types.SELECT_TYPE
          },

          {
            inputTypeItem:new textAreaInterface( {bindItem:''}) ,
            id:'explain',
            labelName:'توضیحات',
            placeholder:'توضیحات',
            name:'explain',
            inputType:Types.TEXTAREA_TYPE
          }
        ],
        submit$:this.submitApi$,

      }

   }


  protected readonly type = type;
  protected readonly Object = Object;
  protected readonly inputInterface = inputInterface;
  protected readonly Types = Types;
}
