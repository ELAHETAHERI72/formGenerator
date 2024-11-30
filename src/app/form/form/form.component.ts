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
import {CustomItem, formConfig, inputTYpe, Types} from "../models/interfaces/form-type.interface";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {FormItemsComponent} from "../form-items/form-items.component";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    this._tempRefs.set(arr);
  };

  constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {
    effect(() => {
      this.customFormItemSetValue();
    })
  }

  @Input() set formConfig(config: formConfig) {
    this._formConfig = config;
    if (config.initialCal) {
      this.createFormItems(this.deepClone(config) as formConfig);
    }
  }


  submitApiForm(form: NgForm) {
    this.customFormItemSetValue();
    this.formConfig.submitted?.(this.deepClone(this.bindItems));
  }

  createFormItems(config: formConfig) {

    if (config.items) {

      config.items?.forEach((element: inputTYpe) => {
        if (!(element.inputType == Types.BORDER_LINE || element.inputType == Types.SECTION_TITLE)) {

          if (element.inputType == Types.SWITCH_TYPE) {

            this.bindItems[element?.bindItem!] = element.defaultValue ?? false;
          } else if (element.inputType == Types.FORM_GROUP) {
            this.bindItems[element.bindItem] = element.defaultValue ?? {}
          } else if (element.inputType == Types.CUSTOM_FORM_ITEM) {
            this.bindItems[element.bindItem] = element.defaultValue ?? '';

            if (this.bindItems[element.bindItem]) {
              this.customFormItemSetValue();
            }

          } else {
            this.bindItems[element?.bindItem!] = element.defaultValue ?? '';
          }
        }
        if(config.apiCall && config.apiCall.path.length){
           console.log('here api call');
          //  https://mocki.io/v1/d65c6f4c-3e1d-4201-b7dd-42d168cf4400
           
         }

      });
      this.formConfig.submitted?.(this.deepClone(this.bindItems));

    }

  }

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
