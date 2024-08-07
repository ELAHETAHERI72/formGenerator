import {Observable, Subject} from "rxjs";


export  type inputTYpe = inputInterface | selectInterface<any> | textAreaInterface;

export interface formItemBase{
  placeholder:string;
  name:string;
  id:string;
  labelName:string;

}

export interface formItem extends formItemBase{
   inputTypeItem:inputTYpe;
   inputType:Types;

}

export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE ='SELECT_TYPE',
}

export class inputInterface {
  bindItem?:string | number| any;
  constructor(item:{bindItem:string | number | any}) {
    this.bindItem = item.bindItem;

  }
}
export class selectInterface<T> {
  Items?:Array<T>;
  bindItem?:string| number | any;
  changeValue$?:Observable<any>| Subject<any>;
  hasApi?:boolean;
  apiUrl?:string;

  constructor(bindItem:string | number | any) {
    this.bindItem = bindItem;

  }
}

export class textAreaInterface {
  bindItem?:string;
  inputType?:Types;
  constructor(bindItem:string | number | any) {
    this.bindItem = bindItem;

  }
}

export class formConfig{
  items?:Array<formItem>;
  submit$?:Observable<any> | Subject<any>;
}
