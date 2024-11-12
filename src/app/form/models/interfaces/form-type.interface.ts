import {BehaviorSubject, Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {TemplateRef} from "@angular/core";


export class formItemBase {
  placeholder?: string;
  name!: string;
  id?: string;
  labelName?: string;
  inputType?: Types;
  isRequired: boolean | string;
  changeValue$?: Observable<any> | BehaviorSubject<any>;
  defaultValue?: any;

  constructor(item: formItemBase) {
    this.placeholder = item.placeholder;
    this.name = item.name;
    this.id = item.id;
    this.labelName = item.labelName;
    this.inputType = item.inputType;
    this.isRequired = item.isRequired;
    this.defaultValue = item.defaultValue;
    this.changeValue$ = item.changeValue$;
  }

}


export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE = 'SELECT_TYPE',
  SWITCH_TYPE = 'SWITCH_TYPE',
  DATE_TYPE = 'DATE_TYPE',
  FORM_GROUP = 'FORM_GROUP',
  CUSTOME_FORM_ITEM = 'CUSTOME_FORM_ITEM',
}

export class inputInterface extends formItemBase {

  bindItem: string;

  constructor(item: inputInterface) {
    super(item);
    this.bindItem = item.bindItem;
  }

}

export class CustomItem extends formItemBase {
  template?: TemplateRef<string>;
  templateName?: string;
  bindItem?: string;

  constructor(item: CustomItem) {
    super(item);
    this.template = item.template;
    this.bindItem = item.bindItem;
    this.templateName = item.templateName;
  }

}

export class selectInterface extends formItemBase {
  fields?: Array<any> | Observable<Array<any>>;
  bindItem?: string | number | any;
  hasApi?: boolean;
  apiUrl?: string;

  constructor(item: selectInterface) {
    super(item);
    this.fields = item.fields;
    this.bindItem = item.bindItem;
    this.changeValue$ = item.changeValue$;
    this.hasApi = item.hasApi;
    this.apiUrl = item.apiUrl;
  }

}

export class dateInterface extends formItemBase {
  minDate?: string;
  bindItem?: string;
  maxDate?: string;

  constructor(item: dateInterface) {
    super(item);
    this.minDate = item.minDate;
    this.bindItem = item.bindItem;
    this.maxDate = item.maxDate;
  }

}

export class textAreaInterface extends formItemBase {
  bindItem?: string;

  constructor(item: textAreaInterface) {
    super(item);
    this.bindItem = item.bindItem;
  }
}

export class switchInterface extends formItemBase {
  bindItem?: any;
  isSelect?: boolean;

  constructor(item: switchInterface) {
    super(item)
    this.bindItem = item.bindItem;
    this.isSelect = item.isSelect;
  }
}

export class formGroups extends formItemBase {
  formItems?: Array<inputTYpe>;
  bindItem: any;

  constructor(item: formGroups) {
    super(item)
    this.formItems = item.formItems;
    this.bindItem = item.bindItem;
  }
}

export type inputTYpe = selectInterface | inputInterface | textAreaInterface | switchInterface;

export class formConfig {
  items: Array<inputTYpe>;
  classList: string;
  formName: NgForm;
  submitted?: (items: any) => void;
  formId?: string;
  isCheckFormValid?:boolean;
  constructor(
    config: {
      items: Array<inputTYpe>,
      submited: (items: any) => void, classList: string, formName: NgForm, formId: string,isCheckFormValid:boolean
    }) {
    this.items = config.items;
    this.classList = config.classList;
    this.formId = config.formId,
      this.submitted = config.submited;
    this.formName = config.formName;
    this.isCheckFormValid = config.isCheckFormValid;
  }
}

function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
