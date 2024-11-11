import {Component, Input} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {hasFormCtrlError, hasFormCtrlNonRequiredError} from "../functions/form-functions";

const Labels = {
  requiredField: 'فیلد اجباری',
  invalidEmail: 'فرمت ایمیل نادرست است',
  invalidNationalCode: 'کد ملی نامعتبر',
  invalidPhoneNumber: 'کد ملی نامعتبر',
  min(num: number) {
    return 'مقدار باید حداقل برابر با ' + num + ' باشد';
  },
  max(num: number) {
    return 'مقدار باید حداکثر برابر با ' + num + ' باشد';
  },
  minLength(num: number) {
    return 'تعداد کاراکتر وارد شده کمتر از ' + num + ' است';
  },
  maxLength(num: number) {
    return 'تعداد کاراکتر وارد شده بیش از ' + num + ' است';
  },
  maxItems(num: number) {
    return 'تعداد آیتم‌ها بیش از ' + num + ' است';
  },
  minItems(num: number) {
    return 'تعداد آیتم‌ها کمتر از ' + num + ' است';
  },
  uploadError(errorMessage: string) {
    return 'خطا در آپلود: ' + errorMessage;
  },
  fileType(valid: string, current: string) {
    return 'فرمت غیرمجاز (فرمت‌های مجاز: ' + valid + ') فرمت فعلی: ' + current;
  },
  minSize(minimum: number, current: string) {
    return 'حجم فایل کمتر از حد مجاز (حداقل: ' + minimum + ') حجم فعلی: ' + current;
  },
  maxSize(maximum: number, current: string) {
    return 'حجم فایل بیش از حد مجاز (حداکثر: ' + maximum + ') حجم فعلی: ' + current;
  },
  notUploadedFiles: 'فایل آپلود نشده دارید',
  invalidInput(validInputs: Array<string>) {
    `ورودی غیر مجاز است (مقادیر مجاز ${validInputs.join(', ')})`
  },
}

@Component({
  standalone: true,
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss'],
  animations: []
})
export class ShowErrorsComponent {

  @Input() ctrl: UntypedFormControl = new UntypedFormControl;
  @Input() patternErrorMsg: string = '';
  @Input() oneRequiredErrorMsg: string = '';
  @Input() errorMessage?: string;
  @Input() waitForTouch: boolean = false;
  @Input() showRequiredError: boolean = false;

  shouldShowError = (ctrl: UntypedFormControl) => (this.waitForTouch ? ctrl.touched : true) &&
    (this.showRequiredError ? hasFormCtrlError(ctrl) : hasFormCtrlNonRequiredError(ctrl))

  ERROR_MESSAGE: any = {
    required: () => Labels.requiredField,
    pattern: () => this.patternErrorMsg ? this.patternErrorMsg : 'فرمت نادرست',
    oneRequired: () => this.oneRequiredErrorMsg ? this.oneRequiredErrorMsg : 'حداقل یکی از فیلدها باید پر شود',
    email: () => Labels.invalidEmail,
    min: (par: any) => Labels.min(par.min),
    max: (par: any) => Labels.min(par.max),
    minlength: (par: any) => Labels.minLength(par.requiredLength),
    maxlength: (par: any) => Labels.maxLength(par.requiredLength),
    nationalCode: () => Labels.invalidNationalCode,
    maxItems: (par: any) => Labels.maxItems(par),
    minItems: (par: any) => Labels.minItems(par.requiredLength),
    uploadError: (par: any) => Labels.uploadError(par),
    fileType: (par: any) => Labels.fileType(par.valid, par.current),
    minSize: (par: any) => Labels.minSize(par.minimum, par.current),
    maxSize: (par: any) => Labels.maxSize(par.maximum, par.current),
    notUploadedFiles: () => Labels.notUploadedFiles,
    invalidInput: (validInputs: Array<string>) => Labels.invalidInput,
  };

  listOfErrors(): string[] {
    if (this.showRequiredError) {
      return Object.keys(this.ctrl.errors!).reverse().map(
        err => {
          return this.ERROR_MESSAGE[err](this.ctrl.getError(err))
        }
      );
    } else {
      return Object.keys(this.ctrl.errors!).reverse()
        .filter(error => {
          return this.ctrl.getError(error) !== 'required' && this.ctrl.getError(error) !== 'oneRequired'
        }).map(
          err => {
            return this.ERROR_MESSAGE[err](this.ctrl.getError(err))
          }
        );
    }

  }

}

