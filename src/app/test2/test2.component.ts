import {Component} from '@angular/core';
import {FormComponent} from "../form/form/form.component";
import {
  dateInterface,
  formConfig,
  formGroups,
  inputInterface,
  selectInterface,
  Types
} from "../form/models/interfaces/form-type.interface";
import {of} from "rxjs";
import {formModel} from "../app.component";
import {NgForm} from "@angular/forms";

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

  formItem = {};
  test2Form!: NgForm;

  config: formConfig = {
    classList: 'd-flex' + ' ' + 'column-gap-2',
    formName: this.test2Form,
    formId: 'test2Form',
    initialCall: false,

    submitted: ((v: formModel) => {
      console.log(v, 'vvvvvvvvvv');
      this.formItem = v;
    }),

    items: [
      new inputInterface({
        id: 'name',
        inputType: Types.INPUT_TYPE,
        labelName: 'نام',
        name: 'name',
        placeholder: 'name',
        bindItem: 'name',
        isRequired: true,
        errorItems: {}
      }),
      new selectInterface({
        id: 'city',
        inputType: Types.SELECT_TYPE,
        labelName: 'شهر',
        name: 'city',
        placeholder: 'شهر',
        isRequired: true,
        errorItems: {},
        fields: of([
          {"name": "تبريز", "id": 1},
          {"name": "مراغه", "id": 2},
          {"name": "ميانه", "id": 3},
          {"name": "شبستر", "id": 4},
          {"name": "مرند", "id": 5},
          {"name": "جلفا", "id": 6},
          {"name": "سراب", "id": 7}
        ]),
        bindItem: 'cityId'
      }),
      new selectInterface({
        id: 'gender',
        inputType: Types.SELECT_TYPE,
        labelName: 'جنسیت',
        name: 'gender',
        placeholder: 'جنسیت',
        fields: [{id: 'male', name: 'مرد', value: 'مرد'}, {id: 'female', name: 'زن', value: 'زن'}],
        bindItem: 'fullName',
        isRequired: true,
        errorItems: {},
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
      //   labelName: 'از تاریخ',
      //   errorItems: {},
      // }),

      // new dateInterface({
      //   id: 'fromDate',
      //   name: 'fromDate',
      //   bindItem: 'fromDate',
      //   inputType: Types.DATE_TYPE,
      //   labelName: 'از تاریخ'
      // }),
      // new formGroups(
      //   {
      //     inputType: Types.FORM_GROUP,
      //     id: 'gender',
      //     labelName: '',
      //     bindItem: 'gender',
      //     name: 'gender',
      //     isRequired:true,
      //     formItems: [
      //       new selectInterface({
      //         id:'gender',
      //         inputType:Types.SELECT_TYPE,
      //         labelName:'جنسیت',
      //         name:'gender',
      //         placeholder:'جنسیت',
      //         fields:[{id:'male',name:'مرد',value:'مرد'},{id:'female',name:'زن',value:'زن'}],
      //         bindItem:'fullName',
      //         isRequired:true,
      //         errorItems: {},
      //       }),
      //     ]
      //
      //   }
      // )
    ],

  };

  // submitApiCall($event: any) {
  //   console.log($event,'submitCall')
  // }

}
