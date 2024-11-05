import { Component } from '@angular/core';
import {FormComponent} from "../form/form/form.component";
import {
  formConfig,
  formGroups,
  inputInterface,
  selectInterface,
  Types
} from "../form/models/interfaces/form-type.interface";
import {of} from "rxjs";
import {formModel} from "../app.component";

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {


  config: formConfig = new formConfig({
    classList: 'd-flex' + ' ' + 'column-gap-2',

    submited: ((v: formModel) => {
      console.log(v, 'vvvvvvvvvv');

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
      new selectInterface({
        id:'city',
        inputType:Types.SELECT_TYPE,
        labelName:'شهر',
        name:'city',
        placeholder:'شهر',
        isRequired:true,
        fields:of([
          {"name":"تبريز","id":1},
          {"name":"مراغه","id":2},
          {"name":"ميانه","id":3},
          {"name":"شبستر","id":4},
          {"name":"مرند","id":5},
          {"name":"جلفا","id":6},
          {"name":"سراب","id":7}
        ]),
        bindItem:'cityId'
      }),
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
      // new switchInterface({
      //   id: 'ispaid',
      //   name: 'قسطی',
      //   placeholder: 'قسطی',
      //   inputType: Types.SWITCH_TYPE,
      //   bindItem: 'ispaid',
      //   isRequired:true,
      // }),
      // {inputType: Types.CUSTOME_FORM_ITEM,
      //   isRequired:false,
      // },
      // new dateInterface({
      //   id: 'fromDate',
      //   name: 'fromDate',
      //   bindItem: 'fromDare',
      //   isRequired:false,
      //   inputType: Types.DATE_TYPE,
      //   labelName: 'از تاریخ'
      // }),

      // new dateInterface({
      //   id: 'fromDate',
      //   name: 'fromDate',
      //   bindItem: 'fromDate',
      //   inputType: Types.DATE_TYPE,
      //   labelName: 'از تاریخ'
      // }),
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

  });

  submitApiCall($event: any) {
    console.log($event,'submitCall')
  }

}
