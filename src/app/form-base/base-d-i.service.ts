import {inject, Injectable, InjectionToken} from '@angular/core';
import { HttpContext } from "@angular/common/http";

export const    BASE_API_RELATIVE_PATH = new InjectionToken<string>('base api relative path');

@Injectable({
  providedIn: 'any'
})
export class BaseDIService {
  entityName = inject(BASE_API_RELATIVE_PATH);
  protected apiContext: HttpContext | undefined;

  constructor() {
    // this.apiContext?.set(API_URL, environment.apiUrl);
    // this.apiContext?.set(LOGGER_URL, '');
    // this.apiContext?.set(RETRY_COUNT, 0);
  }
}
