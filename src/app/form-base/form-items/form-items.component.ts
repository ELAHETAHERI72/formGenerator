import {Component, DestroyRef, EventEmitter, forwardRef, inject, Input, Output, TemplateRef} from '@angular/core';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {ControlContainer, FormsModule, NgForm} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Jalali} from 'jalali-ts';
import {AsyncPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ErrorHandlingDirective } from '../directives/error-handling.directive';
import {CustomItem, FormGroups, FormItemArray, InputTYpe, SelectInterface, Types} from "../classes/form.base-class";


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
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
  templateUrl: './form-items.component.html',
  standalone: true,
  styleUrl: './form-items.component.scss'
})
export class FormItemsComponent {

  _items: Array<InputTYpe> = [];
  _bindItems: { [key: string]: any } = {};

  readonly ngForm = inject(NgForm);
  // readonly fileService = inject(FileService);
  readonly destroyRef = inject(DestroyRef);
  // readonly toasterService = inject(ToastrService);

  // protected modalService: NgbModal = inject<NgbModal>(NgbModal);

  @Output() emitNewDomeItemFromOutside: EventEmitter<{ items: Array<InputTYpe> }> = new EventEmitter();

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

  @Input() set items(config: Array<InputTYpe>) {
    this._items = config;
  }

  get items(): Array<InputTYpe> {
    return this._items;
  }

  returnArray(_t7: SelectInterface | any): Observable<Array<any>> {
    if (_t7 && typeof _t7.fields.subscribe === 'function') {
      return _t7.fields;
    } else {
      return of(_t7.fields); // wrap the array in an Observable
    }

  }

  getFormGroup(_t7: FormGroups | any) {
    return _t7.formItems;
  }

  getTemplate(item: CustomItem | any) {
    return item.template ? item.template : null;
  }

  getFormArray(item: FormItemArray | InputTYpe, formField: string) {
    return (item as FormItemArray)[formField as keyof FormItemArray] ?? undefined;
  }

  protected readonly Jalali = Jalali;

  addFormItem(formItem: FormItemArray | InputTYpe) {
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

  deleteFormArrayItemHandler(value: InputTYpe, formArrayItem: any, i: number) {
    let formItem: Array<FormGroups> = this.getFormArray(value, 'formArrayFields')
    formItem.splice(i, 1);
    this.bindItems[value.bindItem].splice(i, 1);
  }

  // protected readonly labels = labels;


  // getFIleItem(value: FileInputInterFace | InputTYpe) {
  //   return (value as FileInputInterFace);
  // }

    selectionChange(value: SelectInterface | InputTYpe, event: HTMLInputElement) {
    if ((value as SelectInterface).addItemFromOutSide) { // if has input items from outside do this
      (value as SelectInterface).emitFormItems?.({items: this.items, $event: event});
      this.emitNewDomeItemFromOutside.emit({items: this.items})
    } else { // if a simple select without items from outside do this
      value.emitFormItems?.({bindItems: this.bindItems, $event: event});

    }
  }


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

  getSelectMode(value: InputTYpe | SelectInterface) {
    return value as SelectInterface;
  }

  // protected readonly FileInputInterFace = FileInputInterFace;
}
