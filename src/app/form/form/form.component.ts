import {Component} from '@angular/core';
import {formConfig, formItem, inputInterface, inputTYpe, Types} from "../models/interfaces/form-type.interface";
import {Observable, Subject} from "rxjs";
import {FormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {type} from "node:os";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    CommonModule,

  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
   form!:formItem;
  submitApi$!:Observable<any>| Subject<any>;

  formConfig:formConfig = new formConfig();
  private firstName: any | string;
   constructor() {
      this.formConfig = {
        items: [
          {inputTypeItem: new inputInterface({bindItem:this.firstName}),
            id:'name',
            labelName:'firstName',
            placeholder:'firstName',
            name:'firstName',
            inputType:Types.INPUT_TYPE
          }
        ],
        submit$:this.submitApi$
      }

   }

   typeOf(value: inputTYpe) {

     // if (value instanceof inputInterface) {
     //   return 'inputInterface'
     // } else if (value instanceof selectInterface) {
     //   return 'selectInterface'
     // } else {
     //   return 'textAreaInterface'
     // }
   }


  protected readonly type = type;
  protected readonly Object = Object;
  protected readonly inputInterface = inputInterface;
  protected readonly Types = Types;
}
