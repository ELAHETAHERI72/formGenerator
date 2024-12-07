import {BehaviorSubject, Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {effect, EventEmitter, signal, TemplateRef, WritableSignal} from "@angular/core";


export class formItemBase {
  placeholder?: string;
  name!: string;
  id?: string;
  labelName?: string;
  inputType?: Types;
  isRequired: boolean | string;
  changeValue$?: Observable<any> | BehaviorSubject<any>;
  defaultValue?: any;
  errorItems?: ErrorInterface | any;
  pattern?: string | any;
  isDisPlayed?: boolean = false;
  min?: string;
  minLength?:number;
  max?: string;
  maxLength?:number;
  emitFormItems?: (item: any) => void;

  constructor(item: formItemBase) {
    this.placeholder = item.placeholder;
    this.name = item.name;
    this.id = item.id;
    this.labelName = item.labelName;
    this.inputType = item.inputType;
    this.isRequired = item.isRequired;
    this.defaultValue = item.defaultValue;
    this.changeValue$ = item.changeValue$;
    this.errorItems = item.errorItems;
    this.pattern = item.pattern;
    this.isDisPlayed = item.isDisPlayed;
    this.min = item.min ?? undefined;
    this.minLength = item.minLength ?? undefined;
    this.max = item.max ?? undefined;
    this.maxLength = item.maxLength ?? undefined;
    this.emitFormItems = item.emitFormItems;
  }
}

export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE = 'SELECT_TYPE',
  SWITCH_TYPE = 'SWITCH_TYPE',
  DATE_TYPE = 'DATE_TYPE',
  FORM_GROUP = 'FORM_GROUP',
  FORM_ARRAY = 'FORM_ARRAY',
  CUSTOM_FORM_ITEM = 'CUSTOM_FORM_ITEM',
  BORDER_LINE = 'BORDER_LINE',
  SECTION_TITLE = 'SECTION_TITLE',
  INPUT_NUMBER_TYPE = 'INPUT_NUMBER_TYPE',
}

export type borderLine = Pick<formItemBase, 'inputType'>;

export class inputInterface extends formItemBase {

  bindItem: string;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: inputInterface) {
    super(item);
    this.bindItem = item.bindItem;
    if (item.isDisplayedSignal?.() !== undefined) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }

}

export interface ErrorInterface {
  patternErrorMsg?: string;
  oneRequiredErrorMsg?: string;
  errorMessage?: string;
  waitForTouch?: boolean;
  showRequiredError?: boolean;
}

export class CustomItem extends formItemBase {
  template?: TemplateRef<string>;
  templateName?: string;
  bindItem?: string;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: CustomItem) {
    super(item);
    this.template = item.template;
    this.bindItem = item.bindItem;
    this.templateName = item.templateName;

    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }

  }

}

export class selectInterface extends formItemBase {
  fields?: Array<any> | Observable<Array<any>>;
  bindItem?: string | number | any;
  hasApi?: boolean;
  apiUrl?: string;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: selectInterface) {
    super(item);
    this.fields = item.fields;
    this.bindItem = item.bindItem;
    this.changeValue$ = item.changeValue$;
    this.hasApi = item.hasApi;
    this.apiUrl = item.apiUrl;

    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }

}

export class dateInterface extends formItemBase {
  minDate?: string;
  bindItem?: string;
  maxDate?: string;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: dateInterface) {
    super(item);
    this.minDate = item.minDate;
    this.bindItem = item.bindItem;
    this.maxDate = item.maxDate;

    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }

}

export class textAreaInterface extends formItemBase {
  bindItem?: string;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: textAreaInterface) {
    super(item);
    this.bindItem = item.bindItem;

    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }
}

export class switchInterface extends formItemBase {
  bindItem?: any;
  isSelect?: boolean;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: switchInterface) {
    super(item)
    this.bindItem = item.bindItem;
    this.isSelect = item.isSelect;

    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }
}

export class formGroups extends formItemBase {
  formItems: Array<inputTYpe>;
  bindItem?: any;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: formGroups) {
    super(item)
    this.formItems = item.formItems;
    this.bindItem = item.bindItem;
    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;
    }
  }
}

export class formArray extends formItemBase {
  hasAddButton?:boolean;
  formArrayFields?:Array<formGroups>;
  isDisplayedSignal?: WritableSignal<any> = signal(true);
  bindItem?: any;
  constructor(item: formArray) {
    super(item)
    this.hasAddButton = item.hasAddButton;
    this.formArrayFields = item.formArrayFields;
    this.bindItem = item.bindItem;
    if (item.isDisplayedSignal?.()) {
      this.isDisplayedSignal = item.isDisplayedSignal;

    }

  }
}

export type inputTYpe = selectInterface | inputInterface | textAreaInterface | switchInterface | CustomItem;

export class formConfig {
  items: Array<inputTYpe>;
  classList: string;
  formName: NgForm;
  apiCall?: string;

  submitted?: (items: any) => void;
  formId?: string;
  isCheckFormValid?: boolean;
  initialCal: boolean;

  constructor(
    config: {
      items: Array<inputTYpe>,
      submited: (items: any) => void,
      classList: string,
      formName: NgForm,
      formId: string,
      isCheckFormValid: boolean,
      initialCal: boolean,
      apiCall: string,
    }) {
    this.items = config.items;
    this.classList = config.classList;
    this.formId = config.formId,
      this.submitted = config.submited;
    this.formName = config.formName;
    this.isCheckFormValid = config.isCheckFormValid;
    this.initialCal = config.initialCal ?? true;
    this.apiCall = config.apiCall;
  }
}

// function deepClone(obj: any) {
//   return JSON.parse(JSON.stringify(obj));
// }
