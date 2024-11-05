import { Component } from '@angular/core';
import {BaseTableComponent} from "../base-table/base-table/base-table.component";
import {FormComponent} from "../form/form/form.component";
import {RouterOutlet} from "@angular/router";
import {
  formConfig,
  formGroups,
  inputInterface,
  selectInterface,
  Types
} from "../form/models/interfaces/form-type.interface";
import {formModel} from "../app.component";
import {Test2Component} from "../test2/test2.component";
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    BaseTableComponent,
    FormComponent,
    RouterOutlet,
    Test2Component
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent {

  tableConfig:any;
  testForm!:NgForm;

  formItem:any ={};

  config: formConfig = {
    classList: 'd-flex' + ' ' + 'column-gap-2',
    formName:this.testForm,
    formId:'testForm',
    submited: ((v: formModel) => {
      console.log(v, ':)');
     this.formItem = v;
    }),

    items: [
      new inputInterface({
        id:'name',
        inputType:Types.INPUT_TYPE,
        labelName:'نام',
        name:'name',
        placeholder:'name',
        bindItem:'name',
        isRequired:true,
      }),


      new formGroups(
        {
          inputType: Types.FORM_GROUP,
          id: 'gender',
          labelName: '',
          bindItem: 'gender',
          name: 'gender',
          isRequired:true,
          formItems: [
            new selectInterface({
              id:'gender',
              inputType:Types.SELECT_TYPE,
              labelName:'جنسیت',
              name:'gender',
              placeholder:'جنسیت',
              fields:[{id:'male',name:'مرد',value:'مرد'},{id:'female',name:'زن',value:'زن'}],
              bindItem:'fullName',
              isRequired:true,
            }),
          ]

        }
      )
    ],

  };

  submitApiCall($event: any) {
    console.log($event,'submitCall')
  }
}
