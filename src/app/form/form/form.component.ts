import {
  Component,
  DestroyRef,
  effect,
  forwardRef,
  inject,
  Input,
  Renderer2,
  signal,
  TemplateRef,
  ViewContainerRef,
  WritableSignal
} from '@angular/core';
import { CustomItem, formArray, formConfig, formGroups, inputTYpe, Types } from "../models/interfaces/form-type.interface";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormItemsComponent } from "../form-items/form-items.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    forwardRef(() => FormItemsComponent)
  ],

  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',

})

export class FormComponent {

  private _formConfig!: formConfig;

  formItems: any;
  bindItems?: any = {};

  baseService: any;

  _tempRefs: WritableSignal<Array<{ template: TemplateRef<any>, id: any }>> =
    signal<Array<{ template: TemplateRef<any>, id: any }>>([]);

  private destroyRef = inject(DestroyRef);

  get formConfig(): formConfig {
    return this._formConfig;
  }

  @Input() set tempRefs(arr: Array<{ template: TemplateRef<any>, id: any }>) {
    // get custom template from outside
    this._tempRefs.set(arr);
  };

  constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {
    // if we have custom template
    effect(() => {
      this.customFormItemSetValue();
    })
  }

  @Input() set formConfig(config: formConfig) {
    this._formConfig = config;
    if (config.initialCall) {
      this.createFormItems(this.deepClone(config) as formConfig);
    }
  }

  //submit api call
  submitApiForm(form: NgForm) {
    this.customFormItemSetValue();
    this.formConfig.submitted?.(this.deepClone(this.bindItems));
  }

  // create dto model
  createModel(items: Array<inputTYpe>) {
    let formDto: any = {};
    items?.forEach((element: inputTYpe) => {
      if (!(element.inputType == Types.BORDER_LINE || element.inputType == Types.SECTION_TITLE)) {

        if (element.inputType == Types.SWITCH_TYPE) {

          formDto[element?.bindItem!] = element.defaultValue ?? false;
        } else if (element.inputType == Types.SELECT_TYPE) {
          formDto[element.bindItem] = element.defaultValue ?? undefined;

        } else if (element.inputType == Types.CUSTOM_FORM_ITEM) {
          formDto[element.bindItem] = element.defaultValue ?? undefined;

          if (formDto[element.bindItem]) {
            this.customFormItemSetValue();
          }

        }
        else {
          formDto[element?.bindItem!] = element.defaultValue ?? undefined;
        }
      }
      if (element.inputType == Types.FORM_GROUP || element.inputType == Types.FORM_ARRAY) {
        if (element.inputType == Types.FORM_GROUP) {
          formDto[element.bindItem] = this.createModel((element as formGroups | any).formItems) ?? {};

        }
        else if (element.inputType == Types.FORM_ARRAY) {

          formDto[element.bindItem] = element.defaultValue as Array<any> ?? [];
          formDto[element.bindItem] = (element as formArray).formArrayFields?.map(field => {
            return formDto[element.bindItem][field.bindItem] = this.createModel((field as formGroups | any).formItems) ?? {};
          }) ?? []
        }
      }
      // api call coming soon

      // if(config.apiCall){
      //   // this.baseService.
      // }

    });
    return formDto;
  }

  createFormItems(config: formConfig) {
    if (config.items.length !== 0) {
      this.bindItems = this.createModel(config.items);
      this.formConfig.submitted?.(this.deepClone(this.bindItems));
    }

  }

  // add custom template to dto
  customFormItemSetValue() {
    this._formConfig.items.filter(item => item.inputType === Types.CUSTOM_FORM_ITEM).forEach(
      element => {
        Object.values(this._tempRefs()).map(item => {
          if (item.id == (element as CustomItem).bindItem) {
            (element as CustomItem).template = item.template;

          }
        });

        element.changeValue$?.pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(res => {
          this.bindItems[element.bindItem] = res ?? '';
        })

      }
    )
  }

  // deep clone for manage memory
  deepClone(obj: any, hash = new WeakMap()) {
    if (obj === null || typeof obj !== "object") {
      return obj; // Return the value if obj is not an object
    }
    if (hash.has(obj)) {
      return hash.get(obj); // If circular reference, return previous reference
    }

    const clone: any = Array.isArray(obj) ? [] : {}; // Create a new array or object
    hash.set(obj, clone); // Store reference to avoid circular references

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = this.deepClone(obj[key], hash); // Recursively clone
      }
    }

    return clone;

  }

}
