import {
  Component,
  DestroyRef,
  effect, EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit, Output,
  Renderer2,
  signal,
  TemplateRef,
  ViewContainerRef,
  WritableSignal
} from '@angular/core';

import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CustomItem, FormConfig, FormGroups, FormItemArray, InputTYpe, Types} from './classes/form.base-class';
import { BaseDIService } from './base-d-i.service';
import {FormsModule, NgForm} from "@angular/forms";
import {FormItemsComponent} from "./form-items/form-items.component";

@Component({
  selector: 'app-form-base',
  imports: [
    forwardRef(() =>FormItemsComponent),
    FormsModule,
  ],

  templateUrl: './form-base.component.html',
  standalone: true,
  styleUrl: './form-base.component.scss'
})
export class FormBaseComponent implements OnInit {

  private _formConfig!: FormConfig;

  formItems: any;
  bindItems?: any = {};

  formState = false;

  protected _diService: BaseDIService = inject<BaseDIService>(BaseDIService);

  _tempRefs: WritableSignal<Array<{ template: TemplateRef<any>, id: any }>> =
    signal<Array<{ template: TemplateRef<any>, id: any }>>([]);

  private destroyRef = inject(DestroyRef);

  get formConfig(): FormConfig {
    return this._formConfig;
  }

  @Input() set tempRefs(arr: Array<{ template: TemplateRef<any>, id: any }>) {
    // get custom template from outside
    this._tempRefs.set(arr);
  };

  dataWasUpdated?: WritableSignal<boolean> = signal(false);

  constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {
    // if we have custom template
    effect(() => {
      this.customFormItemSetValue();
    })

    // api call after submit api call
    effect(() => {

      this.dataWasUpdated = this.formConfig.dataWasUpdated;

      if (this.dataWasUpdated?.()) {
        if (this.formConfig.hasApiCall) {

          // if (this.formConfig.restOfApiPath) {
          //   this._diService.customGetAll(this._diService.entityName + this.formConfig.restOfApiPath).pipe(
          //     takeUntilDestroyed(this.destroyRef),
          //   ).subscribe({
          //     next: data => {
          //       this.formState.resolved();
          //       if (data !== null) {
          //         this.checkIfNotNull(this.bindItems, data);
          //         this.formConfig.setValueAfterApiCall?.set(this.bindItems)
          //       }
          //     },
          //     error: err => {
          //       this.formState.error();
          //     }
          //   })
          // } else {
          //
          //   this._diService.getAll().pipe(
          //     takeUntilDestroyed(this.destroyRef),
          //   ).subscribe({
          //     next: data => {
          //       this.formState.resolved();
          //       if (data !== null) {
          //         this.checkIfNotNull(this.bindItems, data);
          //         this.formConfig.setValueAfterApiCall?.set(this.bindItems)
          //       }
          //
          //     },
          //     error: err => {
          //       this.formState.error();
          //     }
          //   })
          // }
        }
      }
    });
  }

  // check after api call
  checkIfNotNull(formItem: any, data: any) {
    Object.keys(formItem).forEach(key => {
      if (data[key] != undefined && data[key] != null) {
        if (formItem[key] instanceof Object) {
          this.checkIfNotNull(formItem[key], data[key]);
        } else {
          formItem[key] = (data as any)[key];
        }
      }
    })
  }

  ngOnInit() {
    // api call coming soon
    if (this.formConfig.hasApiCall) {
      // if (this.formConfig.restOfApiPath) {
      //   this._diService.customGetAll(this._diService.entityName + this.formConfig.restOfApiPath).pipe(
      //     takeUntilDestroyed(this.destroyRef),
      //   ).subscribe({
      //     next: data => {
      //       this.formState.resolved()
      //       if (data !== null) {
      //         this.checkIfNotNull(this.bindItems, data);
      //         this.formConfig.setValueAfterApiCall?.set(this.bindItems)
      //       }
      //
      //     },
      //     error: err => {
      //       this.formState.error()
      //     }
      //   })
      // } else {
      //   this._diService.getAll().pipe(
      //     takeUntilDestroyed(this.destroyRef),
      //   ).subscribe({
      //     next: data => {
      //       this.formState.resolved()
      //       if (data !== null) {
      //         this.checkIfNotNull(this.bindItems, data);
      //         this.formConfig.setValueAfterApiCall?.set(this.bindItems)
      //       }
      //
      //     },
      //     error: err => {
      //       this.formState.error()
      //     }
      //   })
      // }

    }

  }

  @Input() set formConfig(config: FormConfig) {
    this._formConfig = config;
    this.createFormItems(config as FormConfig);
  }

  //submit api call
  submitApiForm(form: NgForm) {
    this.customFormItemSetValue();
    this.formConfig.submitted?.(structuredClone(this.bindItems), this.formState);
  }

  // create dto model
  createModel(items: Array<InputTYpe>) {
    let formDto: { [value: string]: any } = {};

    items?.forEach((element: InputTYpe) => {
      if (!(element.inputType == Types.BORDER_LINE || element.inputType == Types.SECTION_TITLE)) {

        if (element.inputType == Types.SWITCH_TYPE) {

          formDto[element?.bindItem] = element.defaultValue ?? false;
        } else if (element.inputType == Types.SELECT_TYPE) {
          formDto[element.bindItem] = element.defaultValue ?? undefined;

        } else if (element.inputType == Types.CUSTOM_FORM_ITEM) {
          formDto[element.bindItem] = element.defaultValue ?? undefined;

          if (formDto[element.bindItem]) {
            this.customFormItemSetValue();
          }

        } else if (element.inputType == Types.INPUT_TYPE) {
          formDto[element.bindItem] = element.defaultValue ?? undefined;
        } else if (element.inputType == Types.FORM_GROUP || element.inputType == Types.FORM_ARRAY) {
          if (element.inputType == Types.FORM_GROUP) {
            formDto[element.bindItem] = this.createModel((element as FormGroups | any).formItems) ?? {} as Object;
          } else if (element.inputType == Types.FORM_ARRAY) {
            formDto[element.bindItem] = element.defaultValue as Array<any> ?? [];
            formDto[element.bindItem] = (element as FormItemArray).formArrayFields?.map(field => {
              return (formDto[element.bindItem][field.bindItem] as Object) = this.createModel((field as FormGroups | any).formItems) ?? {} as Object;
            }) ?? []
          }
        } else {
          formDto[element.bindItem] = element.defaultValue ?? undefined;
        }
      }

    });

    return formDto;
  }

  createFormItems(config: FormConfig) {
    if (config.items.length !== 0) {
      this.bindItems = this.createModel(config.items);
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

  updateDomItems(event: { items: InputTYpe[] }) {
    if (event.items.length > 0) {
      this.formConfig.items = event.items
      this.bindItems = this.createModel(this.formConfig.items);
    }


  }

  // deep clone for manage memory
  // deepClone(obj: any, hash = new WeakMap()) {
  //   if (obj === null || typeof obj !== "object") {
  //     return obj; // Return the value if obj is not an object
  //   }
  //   if (hash.has(obj)) {
  //     return hash.get(obj); // If circular reference, return previous reference
  //   }
  //
  //   const clone: any = Array.isArray(obj) ? [] : {}; // Create a new array or object
  //   hash.set(obj, clone); // Store reference to avoid circular references
  //
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       clone[key] = this.deepClone(obj[key], hash); // Recursively clone
  //     }
  //   }
  //
  //   return clone;
  //
  // }



}
