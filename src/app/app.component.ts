import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form/form.component";
import { dateInterface, formConfig, formGroups, inputInterface, selectInterface, switchInterface, textAreaInterface, Types } from './form/models/interfaces/form-type.interface';
import { Subject } from 'rxjs';
import { BaseTableComponent } from "./base-table/base-table/base-table.component";

export interface formModel {
  name: string;
  cityName: string;
  fullName: string;
  isPay?:boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, BaseTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'formGenerator';
  tableConfig:any;

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
        fileds:[
          {"name":"تبريز","id":1},
          {"name":"مراغه","id":2},
          {"name":"ميانه","id":3},
          {"name":"شبستر","id":4},
          {"name":"مرند","id":5},
          {"name":"جلفا","id":6},
          {"name":"سراب","id":7}
        ],
        bindItem:'cityId'
      }),
      new selectInterface({
        id:'fname',
        inputType:Types.SELECT_TYPE,
        labelName:'نام خانوادگی',
        name:'fname',
        placeholder:'fname',
        fileds:[{id:'zahra',name:'s',value:'s'}],
        bindItem:'fullName',
        isRequired:true,
      }),
      new switchInterface({
        id: 'ispaid',
        name: 'قسطی',
        placeholder: 'قسطی',
        inputType: Types.SWITCH_TYPE,
        bindItem: 'ispaid',
        isRequired:true,
      }),
      new dateInterface({
        id: 'fromDate',
        name: 'fromDate',
        bindItem: 'fromDare',
        isRequired:false,
        inputType: Types.DATE_TYPE,
        labelName: 'از تاریخ'
      }),
    
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
          labelName: 'جنسیت',
          bindItem: 'gender',
          name: 'gender',
          isRequired:true,
          formItems: [
            new selectInterface({
              id: 'fname',
              inputType: Types.SELECT_TYPE,
              labelName: 'نام خانوادگی',
              name: 'fname',
              isRequired:true,
              placeholder: 'fname',
              fileds: [{ id: 'zahra', name: 's', value: 's' }],
              bindItem: 'fullName'
            }),
          ]

        }
      )
    ],

  });

  apiCall($event: any) {
    console.log($event,'eventCall');

 }

  ngOnInit(): void {

  }
}
