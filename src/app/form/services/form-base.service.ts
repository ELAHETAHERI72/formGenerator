import {Injectable, InjectionToken} from "@angular/core";

export const API_INJECTION_TOKEN = new InjectionToken('token for api path must inject')
@Injectable({
  providedIn:'root'
})
export class FormBaseService {

}
