import {Component, DestroyRef, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgSelectModule} from '@ng-select/ng-select';
import {of} from 'rxjs';
import {AsyncPipe, Location} from '@angular/common';
import {
  FormConfig,
  FormGroups,
  FormItemArray,
  InputInterface,
  TextAreaInterface,
  Types
} from "../form-base/classes/form.base-class";
import {FormBaseComponent} from "../form-base/form-base.component";

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    NgSelectModule,
    FormsModule,
    AsyncPipe,
    FormBaseComponent
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})

export class TestFormComponent implements OnInit {

  resultPageContent!: NgForm;

  dataWasUpdated?: WritableSignal<boolean> = signal(false);

  requiredFields: Array<keyof any> = [];
  formItem: any = {};
  readonly location = inject(Location);

  statuses = of([
    {id: 'isValid', name: 'isValid', value: 'isValid'},
    {id: 'notValid', name: 'notValid', value: 'notValid'}
  ])

  disabledName: WritableSignal<any> = signal(false);

  config!: FormConfig;

  ngOnInit() {
    this.initialCall();
  }

  initialCall() {
    this.config = {
      classList: 'd-flex',
      formName: this.resultPageContent,
      hasSaveBtn: true,
      formId: 'guide',
      isCheckFormValid: true,
      hasApiCall: true,
      dataWasUpdated: this.dataWasUpdated, //get datta if api call success
      submitted: ((v: any, formStatus: boolean) => {
        formStatus = true;
        // for initial call && submit form answer
        this.formItem = v;
        // this.callSubmitApi(formStatus);
      }),
      items: [
        new TextAreaInterface({
          id: 'sharePrompt',
          name: 'sharePrompt',
          isRequired: false,
          inputType: Types.TEXTAREA_TYPE,
          bindItem: 'sharePrompt',
          labelName: 'متن تشویق به اشتراک گذاری',
          placeholder: () => 'متن تشویق به اشتراک گذاری',
          className: 'col-lg-6',
          maxLength: 100,
          rows: '5',
        }),
        new InputInterface(
          {
            id:'shareButtonText',
            name:'shareButtonText',
            inputType:Types.INPUT_TYPE,
            isRequired:true,
            bindItem:'shareButtonText',
            className:'col-lg-4',
            labelName:'متن دکمه اشتراک گذاری',
            placeholder: (index:number) => 'متن دکمه اشتراک گذاری',

          }
        ),
        new FormItemArray(
          {
            bindItem: "test",
            formArrayFields: [
              new FormGroups({
                bindItem: "0",
                formItems: [
                  new InputInterface(
                    {
                      id:'sample',
                      name:'sample',
                      inputType:Types.INPUT_TYPE,
                      isRequired:true,
                      bindItem:'sample',
                      className:'col-lg-4',
                      labelName:'نمونه',
                      placeholder: (index:number) => 'متن دکمه اشتراک گذاری',

                    }
                  ),
                ],
                id: "0",
                inputType: Types.FORM_GROUP,
                isRequired: true,
                labelName: ""

              })
            ],
            hasDeleteButton: false,
            id: "",
            inputType: Types.FORM_ARRAY,
            isRequired: true,
            labelName: "تست "

          }
        )
      ]
    };
  }

  checkIsFill(value: any) {
    if (value.$event && value.$event == 'isValid') {
      this.disabledName.set(true);
    } else {
      this.disabledName.set(false);
    }
  }

  addFormArrayField(value: FormGroups[]) {

  }
}


