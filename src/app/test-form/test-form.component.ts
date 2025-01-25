import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {BaseTableComponent} from "../base-table/base-table/base-table.component";
import {FormComponent} from "../form/form/form.component";
import {RouterOutlet} from "@angular/router";
import {
  CustomItem, formArray,
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
import {of} from 'rxjs';
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

  disabledName: WritableSignal<any> = signal(false);

  config!: formConfig;

  ngOnInit() {
    this.initialCall();
  }

  initialCall() {
    this.config = {
      classList: 'd-flex',
      formName: this.testForm,
      formId: 'testForm',
      isCheckFormValid: true,
      initialCall: true,
      apiCall: {method: 'get', path: ''},

      submitted: ((v: formModel) => {
        console.log(v, 'form');
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
          isDisplayedSignal: this.disabledName,
          errorItems: {
            oneRequiredErrorMsg: 'این فیلد اجباری می باشد',
            waitForTouch: true,
            showRequiredError: true,
          }
        }),

        new inputInterface({
          isRequired: true,
          inputType: Types.INPUT_NUMBER_TYPE,
          labelName: 'کد ملی',
          name: 'nationalId',
          id: 'nationalId',
          bindItem: 'nationalId',
          maxLength: 10,
          minLength: 10,
          defaultValue: '',
          errorItems: {
            oneRequiredErrorMsg: 'این فیلد اجباری می باشد',
            waitForTouch: true,
            showRequiredError: true,
          }
        }),
        new CustomItem({
          isRequired: true,
          inputType: Types.CUSTOM_FORM_ITEM,
          labelName: 'وضعیت',
          name: 'status',
          id: 'status',
          bindItem: 'statusId',
          defaultValue: '',
          emitFormItems: (value: any) => this.checkIsFill(value),
          errorItems: {}
        }),
        new selectInterface({
          id: 'city',
          inputType: Types.SELECT_TYPE,
          labelName: 'شهر',
          name: 'city',
          placeholder: 'شهر',
          isRequired: true,
          // errorItems: {},
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
        {
          "inputType": Types.BORDER_LINE,
        } as any,
        {
          "inputType": Types.SECTION_TITLE,
          labelName: 'اطلاعات'
        } as any,
        // new dateInterface({
        //   id: 'fromDate',
        //   name: 'fromDate',
        //   bindItem: 'fromDate',
        //   isRequired: false,
        //   inputType: Types.DATE_TYPE,
        //   labelName: 'از تاریخ'
        // }),

        // add form group inside form
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
                bindItem: 'gender',
                isRequired: true,
                errorItems: {}
              }),
            ]

          }
        ),
        // add line separator
        {
          "inputType": Types.BORDER_LINE,
        } as any,
        // add section title
        {
          "inputType": Types.SECTION_TITLE,
          labelName: 'آرایه تستی'
        } as any,

        // add form array inside form
        new formArray({
          hasAddButton: true,
          inputType: Types.FORM_ARRAY,
          id: 'informations',
          labelName: '',
          isRequired: true,
          bindItem: 'informations',
          addFormArrayField: (item) => this.addFormArrayField(item),
          formArrayFields: [
            new formGroups(
              {
                inputType: Types.FORM_GROUP,
                id: `information${Math.random()}`,
                labelName: '',
                bindItem: 'information',
                isRequired: true,
                formItems: [
                  new selectInterface({
                    id: `info${Math.random()}`,
                    inputType: Types.SELECT_TYPE,
                    labelName: 'اطلاعات فردی',
                    name: `info${Math.random()}`,
                    placeholder: 'اطلاعات فردی',
                    fields: [{id: 'مراد', name: 'مراد', value: 'مراد'}, {id: 'جمیله', name: 'جمیله', value: 'جمیله'}],
                    bindItem: 'info',
                    isRequired: true,
                    errorItems: {}
                  }),
                  new inputInterface({
                    id: `specialCode${Math.random()}`,
                    inputType: Types.INPUT_TYPE,
                    labelName: 'کد ویژه',
                    placeholder: 'specialCode',
                    bindItem: 'specialCode',
                    isRequired: true,
                    errorItems: {
                      oneRequiredErrorMsg: 'این فیلد اجباری می باشد',
                      waitForTouch: true,
                      showRequiredError: true,
                    }
                  }),
                ]
              })
          ]

        })
      ],
    };
  }

  checkIsFill(value: any) {
    if (value.$event && value.$event == 'isValid') {
      this.disabledName.set(true);
    } else {
      this.disabledName.set(false);
    }
  }

  addFormArrayField(value: formGroups[]) {
    value.push(
      new formGroups(
        {
          inputType: Types.FORM_GROUP,
          id: `information${Math.random()}`,
          labelName: '',
          bindItem: 'information',
          name: `information${Math.random()}`,
          isRequired: true,
          formItems: [
            new selectInterface({
              id: `info${Math.random()}`,
              inputType: Types.SELECT_TYPE,
              labelName: 'اطلاعات فردی',
              name: `info${Math.random()}`,
              placeholder: 'اطلاعات فردی',
              fields: [{id: 'مراد', name: 'مراد', value: 'مراد'}, {id: 'جمیله', name: 'جمیله', value: 'جمیله'}],
              bindItem: 'info',
              isRequired: true,
              errorItems: {}
            }),
            new inputInterface({
              id: `specialCode${Math.random()}`,
              inputType: Types.INPUT_TYPE,
              labelName: 'کد ویژه',
              name: `specialCode${Math.random()}`,
              placeholder: 'specialCode',
              bindItem: 'specialCode',
              isRequired: true,
              errorItems: {
                oneRequiredErrorMsg: 'این فیلد اجباری می باشد',
                waitForTouch: true,
                showRequiredError: true,
              }
            }),
          ]
        }))
    debugger
  }
}


