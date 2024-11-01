import { Observable, Subject } from "rxjs";


export class formItemBase {
  placeholder?: string;
  name?: string;
  id?: string;
  labelName?: string;
  inputType?: Types;
  isRequired:boolean | string;
  constructor(item: formItemBase) {
    this.placeholder = item.placeholder;
    this.name = item.name;
    this.id = item.id;
    this.labelName = item.labelName;
    this.inputType = item.inputType;
    this.isRequired = item.isRequired;
  }

}


export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE = 'SELECT_TYPE',
  SWITCH_TYPE = 'SWITCH_TYPE',
  DATE_TYPE = 'DATE_TYPE',
  FORM_GROUP = 'FORM_GROUP',
}

export class inputInterface extends formItemBase {

  bindItem: string;

  constructor(item: inputInterface) {
    super(item);
    this.bindItem = item.bindItem;
  }

}

export class selectInterface extends formItemBase {
  fileds?: Array<any>;
  bindItem?: string | number | any;
  changeValue$?: Observable<any> | Subject<any>;
  hasApi?: boolean;
  apiUrl?: string;

  constructor(item: selectInterface) {
    super(item);
    this.fileds = item.fileds;
    this.bindItem = item.bindItem;
    this.changeValue$ = item.changeValue$;
    this.hasApi = item.hasApi;
    this.apiUrl = item.apiUrl;
  }

}

export class dateInterface extends formItemBase {
  bindItem?: string;
  maxDate?: string;
  minDate?: string;

  constructor(item: dateInterface) {
    super(item);

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
  bindItem:any;
  constructor(item: formGroups) {
    super(item)
    this.formItems = item.formItems;
    this.bindItem = item.bindItem;
  }
}

export type inputTYpe = selectInterface | inputInterface | textAreaInterface | switchInterface ;

export class formConfig {
  items: Array<inputTYpe>;
  classList: string;
  submited?: (items: any) => void;
  constructor(config: { items: Array<inputTYpe>, submited: (items: any) => void, classList: string }) {
    this.items = config.items;
    this.classList = config.classList;
    this.submited = config.submited;
  }
}
