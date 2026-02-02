import {
  Component, forwardRef,
  Inject,
  inject,
  InjectionToken, input,
  Input, InputSignal,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {NgPersianDatepickerModule} from 'ng-persian-datepicker';
import {ControlContainer, FormsModule, NgForm} from '@angular/forms';
import {AsyncPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ErrorHandlingDirective} from '../directives/error-handling.directive';
import {CustomItem, FormGroups, FormItemArray, FormFieldType, SelectInterface, Types} from "../classes/form.base-class";
import {HorizontalLineComponent} from "../form-fields/horizontal-line/horizontal-line.component";
import {TitleDescriptionComponent} from "../form-fields/title-description/title-description.component";
import {TextInputComponent} from "../form-fields/text-input/text-input.component";
import {SelectInputComponent} from "../form-fields/select-input/select-input.component";
import {TextAreaInputComponent} from "../form-fields/text-area-input/text-area-input.component";
import {FormArrayComponent} from "../form-fields/form-array/form-array.component";

export const FORM_ARRAY_COMPONENT = new InjectionToken<any>('FORM_ARRAY_COMPONENT');


@Component({
  selector: 'app-form-items',
  imports: [
    FormsModule,
    NgPersianDatepickerModule,
    NgClass,
    ErrorHandlingDirective,
    NgTemplateOutlet,
    HorizontalLineComponent,
    TitleDescriptionComponent,
    TextInputComponent,
    SelectInputComponent,
    TextAreaInputComponent,
    FormArrayComponent
  ],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
  templateUrl: './form-items.component.html',
  standalone: true,
  styleUrl: './form-items.component.scss'
})
export class FormItemsComponent {

  Types = Types;
  _items: Array<FormFieldType> = [];
  _bindItems: { [key: string]: any } = {};
  hideParent:InputSignal<boolean> = input.required<boolean>();

  // formArray display

  @ViewChild('formArrayPalaceHolder', {read: ViewContainerRef, static: true}) formArrayPalaceHolder!: ViewContainerRef;
  vcr = inject(ViewContainerRef);


  @Input() ItemIndex: number = 0;
  @Input() templateRefs!: Array<TemplateRef<any>>;

  @Input() set bindItems(bindItem: any) {
    this._bindItems = bindItem ?? {};
  };

  @Input() set items(config: Array<FormFieldType>) {
    this._items = config;
  }

  constructor(@Optional() @Inject(FORM_ARRAY_COMPONENT) private formArrayComponent: any
  ) {

  }


  get items(): Array<FormFieldType> {
    return this._items;
  }

  get bindItems() {
    return this._bindItems;
  }


  getFormGroup(_t7: FormGroups | any) {
    return _t7.formItems;
  }

  protected ControlContainer = inject(ControlContainer);


  getTemplate(item: CustomItem | any) {
    return item.template ? item.template : null;
  }

  loadFormArray() {

  }


}
