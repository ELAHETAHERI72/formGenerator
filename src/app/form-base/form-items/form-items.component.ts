import {Component, DestroyRef, EventEmitter, forwardRef, inject, Input, Output, TemplateRef} from '@angular/core';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {ControlContainer, FormsModule, NgForm} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Jalali} from 'jalali-ts';
import {AsyncPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ErrorHandlingDirective } from '../directives/error-handling.directive';
import {CustomItem, FormGroups, FormItemArray, InputType, SelectInterface, Types} from "../classes/form.base-class";
import {HorizontalLineComponent} from "../form-fields/horizontal-line/horizontal-line.component";
import {TitleDescriptionComponent} from "../form-fields/title-description/title-description.component";
import {TextInputComponent} from "../form-fields/text-input/text-input.component";
import {SelectInputComponent} from "../form-fields/select-input/select-input.component";


@Component({
  selector: 'app-form-items',
  imports: [
    FormsModule,
    NgPersianDatepickerModule,
    NgClass,
    ErrorHandlingDirective,
    NgSelectComponent,
    AsyncPipe,
    NgTemplateOutlet,
    HorizontalLineComponent,
    TitleDescriptionComponent,
    TextInputComponent,
    SelectInputComponent,
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
  templateUrl: './form-items.component.html',
  standalone: true,
  styleUrl: './form-items.component.scss'
})
export class FormItemsComponent {

  _items: Array<InputType> = [];
  _bindItems: { [key: string]: any } = {};

  readonly ngForm = inject(NgForm);
  // readonly fileService = inject(FileService);
  readonly destroyRef = inject(DestroyRef);
  // readonly toasterService = inject(ToastrService);

  // protected modalService: NgbModal = inject<NgbModal>(NgbModal);


  @Input() set bindItems(bindItem: any) {
    this._bindItems = bindItem ?? {};
  };

  @Input() ItemIndex: number = 0;

  get bindItems() {
    return this._bindItems;
  }

  @Input() templateRefs!: Array<TemplateRef<any>>;

  Types = Types;

  protected ControlContainer = inject(ControlContainer);

  @Input() set items(config: Array<InputType>) {
    this._items = config;
  }

  get items(): Array<InputType> {
    return this._items;
  }


  getFormGroup(_t7: FormGroups | any) {
    return _t7.formItems;
  }

  getTemplate(item: CustomItem | any) {
    return item.template ? item.template : null;
  }

  getFormArray(item: FormItemArray | InputType, formField: string) {
    return (item as FormItemArray)[formField as keyof FormItemArray] ?? undefined;
  }

  protected readonly Jalali = Jalali;

  addFormItem(formItem: FormItemArray | InputType) {
    let bindItemModel: any = {};

    if ((formItem as FormItemArray)?.maxItemAddLength) {
      if (((formItem as FormItemArray).formArrayFields as FormGroups[]).length <
        (formItem as FormItemArray).maxItemAddLength!) {
        (formItem as FormItemArray).addFormArrayField?.((formItem as FormItemArray).formArrayFields as FormGroups[]);
        ((formItem as FormItemArray).formArrayFields[0] as FormGroups).formItems.forEach(item => {
          bindItemModel[item.bindItem] = '';
        })
        this.bindItems[formItem.bindItem].push(bindItemModel);

      } else {
        // this.toasterService.error((formItem as FormItemArray).maxLengthMessage)

      }
    } else {
      (formItem as FormItemArray).addFormArrayField?.((formItem as FormItemArray).formArrayFields as FormGroups[]);

      ((formItem as FormItemArray).formArrayFields[0] as FormGroups).formItems.forEach(item => {
        bindItemModel[item.bindItem] = '';
      })
      this.bindItems[formItem.bindItem].push(bindItemModel);

    }

  }

  deleteFormArrayItemHandler(value: InputType, formArrayItem: any, i: number) {
    let formItem: Array<FormGroups> = this.getFormArray(value, 'formArrayFields')
    formItem.splice(i, 1);
    this.bindItems[value.bindItem].splice(i, 1);
  }

  // protected readonly labels = labels;


  // getFIleItem(value: FileInputInterFace | InputTYpe) {
  //   return (value as FileInputInterFace);
  // }




  // select section
  // getFileInputItem(value: InputTYpe) {
  //   return value as FileInputInterFace;
  // }
  // selectFileInput(value: InputTYpe, $event: any) {
  //   this.bindItems[value.bindItem] = $event.name;
  //
  //   if ((value as FileInputInterFace) && $event) {
  //     if ((value as FileInputInterFace).isUploadToServer) {
  //       (value as FileInputInterFace).uploadStatus?.loading();
  //       value.emitFormItems?.($event);
  //       this.fileService.uploadFile($event).pipe(
  //         takeUntilDestroyed(this.destroyRef)
  //       ).subscribe({
  //         next: (response: any) => {
  //           if (response && value) {
  //             this.bindItems[value.bindItem] = response;
  //             (value as FileInputInterFace).uploadStatus?.resolved();
  //           }
  //         },
  //         error: err => {
  //           this.toasterService.error(errors.errorOccurred);
  //           (value as FileInputInterFace).uploadStatus?.error();
  //         }
  //       })
  //     } else {
  //       value.emitFormItems?.({item: value, select: $event});
  //     }
  //   }
  // }



  // protected readonly FileInputInterFace = FileInputInterFace;
}
