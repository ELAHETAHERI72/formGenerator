import {Observable, Subject} from "rxjs";


// export  type inputTYpe = inputInterface | selectInterface | textAreaInterface;

export interface formItemBase{
  placeholder:string;
  name:string;
  id:string;
  labelName:string;

}

export interface formItem extends formItemBase{
   inputTypeItem:inputInterface | selectInterface | textAreaInterface;
   inputType:Types;

}

export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE ='SELECT_TYPE',
}

export interface inputInterface {
  bindItem?:string | number| any;
  
}
export interface selectInterface {
  Items?:Array<any>;
  bindItem?:string| number | any;
  changeValue$?:Observable<any>| Subject<any>;
  hasApi?:boolean;
  apiUrl?:string;

}

export interface textAreaInterface {
  bindItem?:string;
 
}

export class formConfig{
  items?:Array<formItem>;
  submit$?:Observable<any> | Subject<any>;
  constructor(config:formConfig){
    this.items = config.items;
    this.submit$ = config.submit$;
  }
}
