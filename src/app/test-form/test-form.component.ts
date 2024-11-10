import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../base-table/base-table/base-table.component";
import {FormComponent} from "../form/form/form.component";
import {RouterOutlet} from "@angular/router";
import {
  CustomItem,
  formConfig,
  formGroups,
  inputInterface,
  selectInterface,
  Types
} from "../form/models/interfaces/form-type.interface";
import {formModel} from "../app.component";
import {Test2Component} from "../test2/test2.component";
import {FormsModule, NgForm} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {BehaviorSubject, of} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    BaseTableComponent,
    FormComponent,
    RouterOutlet,
    Test2Component,
    NgSelectModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'

})
export class TestFormComponent implements OnInit {

  tableConfig: any;
  testForm!: NgForm;

  formItem: any = {};

  statuses = of([
    {id: 'isValid', name: 'قابل قبول', value: 'isValid'},
    {id: 'notValid', name: 'غیرقابل قبول', value: 'notValid'}
  ])

  changeStatus$ = new BehaviorSubject(null);
  changeNationalId$ = new BehaviorSubject(null);

  @ViewChild('customNationalTempRef') customNationalTempRef?: TemplateRef<any>;
  @ViewChild('customStatusTempRef') customStatusTempRef?: TemplateRef<any>;


  config!: formConfig;

  ngOnInit() {
    this.initialCall();
  }

  constructor() {
  }

  initialCall() {
    this.config = {
      classList: 'd-flex',
      formName: this.testForm,
      formId: 'testForm',
      submitted: ((v: formModel) => {
        console.log(v, ':)');
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
        }),

        new CustomItem({
          isRequired: true,
          inputType: Types.CUSTOME_FORM_ITEM,
          labelName: 'وضعیت',
          name: 'status',
          id: 'status',
          bindItem: 'statusId',
          defaultValue: '',
          templateName: 'customStatusTempRef',
          changeValue$: this.changeStatus$,
        }),

        new CustomItem({
          isRequired: true,
          inputType: Types.CUSTOME_FORM_ITEM,
          labelName: 'کد ملی',
          name: 'nationalId',
          id: 'nationalId',
          bindItem: 'nationalId',
          defaultValue: '',

          templateName: 'customNationalTempRef',
          changeValue$: this.changeNationalId$,
        }),
        // new dateInterface({
        //   id: 'fromDate',
        //   name: 'fromDate',
        //   bindItem: 'fromDarte',
        //   isRequired: false,
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
            isRequired: true,
            formItems: [
              new selectInterface({
                id: 'gender',
                inputType: Types.SELECT_TYPE,
                labelName: 'جنسیت',
                name: 'gender',
                placeholder: 'جنسیت',
                fields: [{id: 'male', name: 'مرد', value: 'مرد'}, {id: 'female', name: 'زن', value: 'زن'}],
                bindItem: 'fullName',
                isRequired: true,
              }),
            ]

          }
        )
      ],
    };
  }

}


