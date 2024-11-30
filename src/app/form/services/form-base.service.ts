import {inject, Injectable, InjectionToken} from "@angular/core";
import { of } from "rxjs";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
@Injectable({
  providedIn:'root'
})
export class FormBaseService {


  private API_TOKEN = inject(API_BASE_URL);

  constructor(){
    
  }


  getForm(){
    console.log(this.API_TOKEN);
    return of([1,2,3,4])
  }

}
