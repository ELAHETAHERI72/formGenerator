import {Component, forwardRef, Input} from '@angular/core';
import {ErrorHandlingDirective} from "../../directives/error-handling.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {FormGroups, FormItemArray, InputType, Types} from "../../classes/form.base-class";
import {FormItemsComponent} from "../../form-items/form-items.component";

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorHandlingDirective,
    forwardRef(() => FormItemsComponent),
  ],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {

  private _config!: FormItemArray;

  @Input({required: true}) set itemConfig(config: FormItemArray | InputType) {
    this._config = config as FormItemArray;
  };

  @Input({required: true}) ItemIndex!: number;
  @Input({required: true}) bindItemField: any;

  protected readonly Types = Types;

  get config(): FormItemArray {
    return this._config;
  }

  //  add form item on click add button
  addFormItem(formItem: FormItemArray | InputType) {
    let bindItemModel: any = {};

    if ((formItem as FormItemArray)?.maxItemAddLength) {
      if (((formItem as FormItemArray).formArrayFields as FormGroups[]).length <
        (formItem as FormItemArray).maxItemAddLength!) {
        (formItem as FormItemArray).addFormArrayField?.((formItem as FormItemArray).formArrayFields as FormGroups[]);
        ((formItem as FormItemArray).formArrayFields[0] as FormGroups).formItems.forEach(item => {
          bindItemModel[item.bindItem] = '';
        })
        this.bindItemField[formItem.bindItem].push(bindItemModel);

      } else {
        // this.toasterService.error((formItem as FormItemArray).maxLengthMessage)

      }
    } else {
      (formItem as FormItemArray).addFormArrayField?.((formItem as FormItemArray).formArrayFields as FormGroups[]);

      ((formItem as FormItemArray).formArrayFields[0] as FormGroups).formItems.forEach(item => {
        bindItemModel[item.bindItem] = '';
      })
      this.bindItemField[formItem.bindItem].push(bindItemModel);

    }

  }


  getFormArray(item: FormItemArray | InputType, formField: string) {
    return (item as FormItemArray)[formField as keyof FormItemArray] ?? undefined;
  }

  getFormGroup(_t7: FormGroups | any) {
    return _t7.formItems;
  }

  deleteFormArrayItemHandler(value: InputType, formArrayItem: any, i: number) {
    let formItem: Array<FormGroups> = this.getFormArray(value, 'formArrayFields')
    formItem.splice(i, 1);
    this.bindItemField[value.bindItem].splice(i, 1);
  }
}
