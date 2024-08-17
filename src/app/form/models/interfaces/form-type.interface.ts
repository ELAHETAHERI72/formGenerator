import {BehaviorSubject, Observable, Subject} from "rxjs";




export class formItemBase {
  placeholder?:string;
  name?:string;
  id?:string;
  labelName?:string;
  inputType?:Types;

  constructor(item:formItemBase){
    this.placeholder = item.placeholder;
    this.name = item.name;
    this.id = item.id;
    this.labelName = item.labelName;
    this.inputType = item.inputType;
  }

}


export enum Types {
  INPUT_TYPE = 'INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE ='SELECT_TYPE',
}

export class inputInterface extends formItemBase{

  bindItem?:string;

  constructor(item:inputInterface){
    super(item);
     this.bindItem = item.bindItem;
  }

}

export class selectInterface extends formItemBase{
  fileds?:Array<any>;
  bindItem?:string| number | any;
  changeValue$?:Observable<any>| Subject<any>;
  hasApi?:boolean;
  apiUrl?:string;

    constructor(item:selectInterface){
      super(item);
      this.fileds = item.fileds;
      this.bindItem = item.bindItem;
      this.changeValue$ = item.changeValue$;
      this.hasApi = item.hasApi;
      this.apiUrl = item.apiUrl;
    }
  
}

export class textAreaInterface extends formItemBase{
  bindItem?:string;
 
  constructor(item:textAreaInterface){
    super(item);
     this.bindItem = item.bindItem;
  }
}

export  type inputTYpe = selectInterface| inputInterface | textAreaInterface;


export class formConfig{
  items?:Array<inputTYpe>;
  submit$?:Observable<any> | BehaviorSubject<any>;
  classList?:string;
  constructor(config:formConfig){
    this.items = config.items;
    this.submit$ = config.submit$;
    this.classList = config.classList;
  }
}
