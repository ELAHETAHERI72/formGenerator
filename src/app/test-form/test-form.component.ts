import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {FormComponent} from "../form/form/form.component";
import {
  CustomItem, dateInterface, formArray,
  formConfig,
  formGroups,
  inputInterface,
  selectInterface,
  Types
} from "../form/models/interfaces/form-type.interface";
import {formModel} from "../app.component";
import {FormsModule, NgForm} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {of} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    FormComponent,
    NgSelectModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})

export class TestFormComponent implements OnInit {

  testForm!: NgForm;

  formItem: any = {};

  statuses = of([
    {id: 'isValid', name: 'isValid', value: 'isValid'},
    {id: 'notValid', name: 'notValid', value: 'notValid'}
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

        // for initial call && submit form answer
        this.formItem = v;
      }),

      items: [
        // add text input
        new inputInterface({
          id: 'name',
          inputType: Types.INPUT_TYPE,
          labelName: 'name',
          name: 'name',
          placeholder: 'name',
          bindItem: 'name',
          isRequired: true,  //displayed depends on another section
          isDisplayedSignal: this.disabledName,
          errorItems: {
            oneRequiredErrorMsg: 'this field is required',
            waitForTouch: true,
            showRequiredError: true,
          }
        }),
        // add only number
        new inputInterface({
          isRequired: true,
          inputType: Types.INPUT_NUMBER_TYPE,
          labelName: 'nationalId',
          name: 'nationalId',
          id: 'nationalId',
          bindItem: 'nationalId',
          pattern: /^\d{10}$/,
          maxLength: '10',
          minLength: '10',
          min: '10',
          max: '10',
          defaultValue: '',
          errorItems: {
            oneRequiredErrorMsg: '',
            waitForTouch: true,
            showRequiredError: true,
          }
        }),
        // add custom template
        new CustomItem({
          isRequired: true,
          inputType: Types.CUSTOM_FORM_ITEM,
          labelName: 'status',
          name: 'status',
          id: 'status',
          bindItem: 'statusId',
          defaultValue: '',// for check changes , for example if some section we want show or not depend on this field

          emitFormItems: (value: any) => this.checkIsFill(value),
          errorItems: {}
        }),
        // add select box
        new selectInterface({
          id: 'city',
          inputType: Types.SELECT_TYPE,
          labelName: 'city',
          name: 'city',
          placeholder: 'city',
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
        //  add divider line
        {
          "inputType": Types.BORDER_LINE,
        } as any,
        // add title for each section
        {
          "inputType": Types.SECTION_TITLE,
          labelName: 'information'
        } as any,
        // add date picker
        new dateInterface({
          id: 'fromDate',
          name: 'fromDate',
          bindItem: 'fromDate',
          isRequired: false,
          inputType: Types.DATE_TYPE,
          labelName: 'from date'
        }),

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
                labelName: 'gender',
                name: 'gender',
                placeholder: 'gender',
                fields: [{id: 'male', name: 'male', value: 'male'}, {id: 'female', name: 'female', value: 'female'}],
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
          labelName: 'array list'
        } as any,

        // add formArray inside form
        new formArray({
          hasAddButton: true,
          inputType: Types.FORM_ARRAY,
          id: 'informations',
          labelName: '',
          isRequired: true,
          bindItem: 'informations',// how you can add form item inside form array dynamic
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
                    labelName: 'personal information',
                    name: `info${Math.random()}`,
                    placeholder: 'personal information',
                    fields: [{id: 'مراد', name: 'مراد', value: 'مراد'}, {id: 'جمیله', name: 'جمیله', value: 'جمیله'}],
                    bindItem: 'info',
                    isRequired: true,
                    errorItems: {}
                  }),
                  new inputInterface({
                    id: `specialCode${Math.random()}`,
                    inputType: Types.INPUT_TYPE,
                    labelName: 'special code',
                    placeholder: 'specialCode',
                    bindItem: 'specialCode',
                    isRequired: true,
                    errorItems: {
                      oneRequiredErrorMsg: '',
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
              labelName:  'personal information',
              name: `info${Math.random()}`,
              placeholder: 'personal information',
              fields: [{id: 'مراد', name: 'مراد', value: 'مراد'}, {id: 'جمیله', name: 'جمیله', value: 'جمیله'}],
              bindItem: 'info',
              isRequired: true,
              errorItems: {}
            }),
            new inputInterface({
              id: `specialCode${Math.random()}`,
              inputType: Types.INPUT_TYPE,
              labelName: 'special code',
              name: `specialCode${Math.random()}`,
              placeholder: 'specialCode',
              bindItem: 'specialCode',
              isRequired: true,
              errorItems: {
                oneRequiredErrorMsg: '',
                waitForTouch: true,
                showRequiredError: true,
              }
            }),
          ]
        }))
  }
}


