import {Observable, Subject} from "rxjs";


// export  type inputTYpe = inputInterface | selectInterface<any> | textAreaInterface;

export interface formItemBase {
  placeholder:string;
  name:string;
  id:string;
  labelName:string;
  inputTypeItem: inputInterface | selectInterface | textAreaInterface;
  inputType:Types;
}


export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE ='SELECT_TYPE',
}

export class inputInterface {
  bindItem?:string | number| any;
  constructor(item:inputInterface) {
    this.bindItem = item.bindItem;

  }
}
export class selectInterface {
  fileds:Array<any>;
  bindItem?:string| number | any;
  changeValue$?:Observable<any>| Subject<any>;
  hasApi?:boolean;
  apiUrl?:string;

  constructor(selectModel:selectInterface) {
    this.fileds = selectModel.fileds;
    this.bindItem = selectModel.bindItem;
    this.changeValue$ = selectModel.changeValue$;
    this.hasApi = selectModel.hasApi;
    this.apiUrl = selectModel.apiUrl;

  }
}

export class textAreaInterface {
  bindItem?:string;
  constructor(item:textAreaInterface) {
    this.bindItem = item.bindItem;
  }
}

export class formConfig{
  items?:Array<formItemBase>;
  submit$?:Observable<any> | Subject<any>;
}
