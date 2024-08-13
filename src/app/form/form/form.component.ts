import {Component, OnInit} from '@angular/core';
import {formConfig, formItem, inputInterface, selectInterface, Types} from "../models/interfaces/form-type.interface";
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
export class FormComponent  implements OnInit{
   form!:formItem;
  submitApi$!:Observable<any>| Subject<any>;

  formConfig!:formConfig;
  private firstName: any | string;
   constructor() {}

  ngOnInit(): void {
    this.formConfig = new formConfig({
      items: [
        {
          inputTypeItem: {bindItem:this.firstName} as inputInterface,
          id:'name',
          labelName:'firstName',
          placeholder:'firstName',
          name:'firstName',
          inputType:Types.INPUT_TYPE
        },
        {
          inputType:Types.SELECT_TYPE,
          inputTypeItem: {bindItem:this.firstName,Items:[{id:1,val:'dddd'}]} as selectInterface,
          id:'name',
          labelName:'firstName',
          placeholder:'firstName',
          name:'firstName',
        }
      ],
      
      submit$:this.submitApi$
    });


    
  }

  protected readonly type = type;
  protected readonly Object = Object;
  protected readonly Types = Types;
}
