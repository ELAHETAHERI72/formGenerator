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
import {
  CustomItem,
  formArray,
  formConfig,
  formGroups,
  inputTYpe,
  Types
} from "../models/interfaces/form-type.interface";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, JsonPipe, NgIf} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {SwitchButtonComponent} from "../../components/switch-button/switch-button.component";
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {FormItemsComponent} from "../form-items/form-items.component";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    CommonModule,
    NgSelectModule,
    SwitchButtonComponent,
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
    if (config.initialCall) {
      this.createFormItems(this.deepClone(config) as formConfig);
    }
  }

  submitApiForm(form: NgForm) {
    this.customFormItemSetValue();
    this.formConfig.submitted?.(this.deepClone(this.bindItems));
  }

  createModel(items: Array<inputTYpe>) {
    let formDto: any = {};
    items?.forEach((element: inputTYpe) => {
      if (!(element.inputType == Types.BORDER_LINE || element.inputType == Types.SECTION_TITLE)) {

        if (element.inputType == Types.SWITCH_TYPE) {

          formDto[element?.bindItem!] = element.defaultValue ?? false;
        } else if (element.inputType == Types.SELECT_TYPE) {
          formDto[element.bindItem] = element.defaultValue ?? '';

        } else if (element.inputType == Types.CUSTOM_FORM_ITEM) {
          formDto[element.bindItem] = element.defaultValue ?? '';

          if (formDto[element.bindItem]) {
            this.customFormItemSetValue();
          }

        } else {
          formDto[element?.bindItem!] = element.defaultValue ?? '';
        }
      }
      if (element.inputType == Types.FORM_GROUP || element.inputType == Types.FORM_ARRAY) {
        if (element.inputType == Types.FORM_GROUP) {
          formDto[element.bindItem] = this.createModel((element as formGroups).formItems) ?? {};

        } else if (element.inputType == Types.FORM_ARRAY) {
          formDto[element.bindItem] = <Array<any>>element.defaultValue ?? [];
          (element as formArray).formArrayFields?.map(field => {
            formDto[element.bindItem] = [...formDto[element.bindItem],this.createModel(field.formItems)];
          })
        }
      }
      // if(config.apiCall){
      //   // this.baseService.
      // }

    });
    return formDto;
  }

  createFormItems(config: formConfig) {
    if (config.items.length !== 0) {
      // config.items?.forEach((element: inputTYpe) => {
      //   if (!(element.inputType == Types.BORDER_LINE || element.inputType == Types.SECTION_TITLE)) {
      //
      //     if (element.inputType == Types.SWITCH_TYPE) {
      //
      //       this.bindItems[element?.bindItem!] = element.defaultValue ?? false;
      //     } else if (element.inputType == Types.FORM_GROUP) {
      //       this.bindItems[element.bindItem] = element.defaultValue ?? {}
      //     } else if (element.inputType == Types.FORM_ARRAY) {
      //       this.bindItems[element.bindItem] = <Array<any>>element.defaultValue ?? [];
      //       (element as formArray).formArrayFields?.map(field => {
      //         // this.bindItems[element.bindItem][field.bindItem] = field.defaultValue ?? {};
      //         this.bindItems[element.bindItem].push(field.defaultValue ?? {});
      //
      //       })
      //
      //     } else if (element.inputType == Types.CUSTOM_FORM_ITEM) {
      //       this.bindItems[element.bindItem] = element.defaultValue ?? '';
      //
      //       if (this.bindItems[element.bindItem]) {
      //         this.customFormItemSetValue();
      //       }
      //
      //     } else {
      //       this.bindItems[element?.bindItem!] = element.defaultValue ?? '';
      //     }
      //   }
      //   console.log(this.bindItems, 'bindItems');
      //   // if(config.apiCall){
      //   //   // this.baseService.
      //   // }
      // });
      this.bindItems = this.createModel(config.items);
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
