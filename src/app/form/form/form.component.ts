import { Component, DestroyRef, forwardRef, inject, Input, TemplateRef } from '@angular/core';
import {
  formConfig,
  inputTYpe,
  Types
} from "../models/interfaces/form-type.interface";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, JsonPipe, NgIf } from "@angular/common";
import {
  NgSelectModule
} from "@ng-select/ng-select";
import { SwitchButtonComponent } from "../../components/switch-button/switch-button.component";
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { FormItemsComponent } from "../form-items/form-items.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // Make sure to import this from the correct location  

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

  private destroyRef = inject(DestroyRef);


  @Input() set formConfig(config: formConfig) {
    this._formConfig = config;
    this.createFormItems(this.deepClone(config.items) as Array<inputTYpe>);

  }


  get formConfig(): formConfig {
    return this._formConfig;
  }

  submitApiForm(form: NgForm) {
    this.customeFormItemSetValue();
    this.formConfig.submited?.(this.deepClone(this.bindItems));
  }

  createFormItems(formItems: Array<inputTYpe>) {

    if (formItems) {

      formItems?.forEach((element: inputTYpe) => {

        if (element.inputType == Types.SWITCH_TYPE) {

          this.bindItems[element?.bindItem!] = element.defaultValue ?? false;
        } else if (element.inputType == Types.FORM_GROUP) {
          this.bindItems[element.bindItem] = element.defaultValue ?? {}
        }
        else if (element.inputType == Types.CUSTOME_FORM_ITEM) {
          
          this.bindItems[element.bindItem] = element.defaultValue ?? '';

          if(this.bindItems[element.bindItem]){

            element.changeValue$?.pipe(
              takeUntilDestroyed(this.destroyRef)
            ).subscribe(
              res => {
                if(res){
                  this.bindItems[element.bindItem] = res ?? '';
                }
              }
            )
          }

        }
        else {
          this.bindItems[element?.bindItem!] = element.defaultValue ?? '';
        }

      });
      this.formConfig.submited?.(this.deepClone(this.bindItems));

    }

  }

  customeFormItemSetValue(){
    this._formConfig.items.filter(item=>item.inputType === Types.CUSTOME_FORM_ITEM).forEach(
      element =>{
         element.changeValue$?.pipe(
          takeUntilDestroyed(this.destroyRef)
         ).subscribe(res=>{
          console.log(element.bindItem);
          
          this.bindItems[element.bindItem] = res;          
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
