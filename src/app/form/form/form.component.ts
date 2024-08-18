import {Component} from '@angular/core';
import {
  formConfig,
  formItemBase,
  inputInterface,
  inputTYpe,
  selectInterface, textAreaInterface,
  Types
} from "../models/interfaces/form-type.interface";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Form, FormGroup, FormsModule, NgForm} from "@angular/forms";
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


  formConfig!:formConfig;
  private firstName: any | string;
  Types = Types;

  formItem:Array<formItemBase>=[];
   constructor() { }

  ngOnInit(): void {
    this.formConfig = new formConfig({
      classList:'d-flex'+' '+'column-gap-2',

      items: [
        new inputInterface({
          bindItem:'',
          id:'1',
          inputType:Types.INPUT_TYPE,
          labelName:'نام',
          name:'name',
          placeholder:'name',

        }),
        new selectInterface({
          bindItem:'id',
          id:'1',
          inputType:Types.SELECT_TYPE,
          labelName:'نام',
          name:'name',
          placeholder:'name',
          fileds:[{id:1,name:'vehicle',value:'volvu'}],

        }),
        new textAreaInterface({
          bindItem:'text',
          id:'1',
          inputType:Types.TEXTAREA_TYPE,
          labelName:'توضیحات',
          name:'text',
          placeholder:'توضیحات',
        }),
        new selectInterface({
          bindItem:'id',
          id:'1',
          inputType:Types.SELECT_TYPE,
          labelName:'نام',
          name:'name',
          placeholder:'name',
          fileds:[{id:1,name:'vehicle',value:'volvu'}],
        }),
      ],
      
      submit$: new Observable().subscribe(console.log) as any,
      submited:(form:NgForm)=>{console.log(form?.value)}
      
    });
  }

  returnArray(_t7: selectInterface |any) {        
    return _t7.fileds;
  }



  }
