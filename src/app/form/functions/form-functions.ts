import {FormControl, FormGroup, NgForm, UntypedFormControl, ValidationErrors} from '@angular/forms';

export function hasInputError(form: FormGroup, field: string, isSubmitted: boolean) {
  return form.controls[field].invalid && (form.controls[field].touched || isSubmitted)
}

export function returnAsFormControl(form: any) {
  return form as FormControl;
}

export function hasFormCtrlError(ctrl: FormControl): boolean {
  let validationErrors = ctrl && ctrl.errors;
  return !!validationErrors;
}

export function hasFormCtrlNonRequiredError(ctrl: UntypedFormControl): boolean {
  let errorKeys = (ctrl && ctrl.errors) ? Object.keys(ctrl.errors) : []
  return !!(ctrl && ctrl.errors && (errorKeys.length > 1 || (!errorKeys.includes('required') && !errorKeys.includes('oneRequired'))))
}

export function isValidNationalCode(input: any): boolean {
  if (!/^\d{10}$/.test(input)) {
    return false;
  } else {
    let check = +input[9];
    let sum = Array(9)
      .fill('')
      /**
       * @description multiply each number in nationalCode "(10 - i)" times  ("i" satisfy index from right to left: 9876543210)
       * @example i = 0 -> input[0] * 10
       */
      .map((_, i) => +input[i] * (10 - i))
      .reduce((x, y) => x + y) % 11;
    return ((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11));
  }
}

export const FormRegex = {
  // TODO: this regex has problem
  onlyPersianText: /^[\u0600-\u06FF\n]+[\u0600-\u06FF\n\[#+*\-@!()}{%^\] 0-9]*$/,
  mobileCode: /^09\d*/,
  desiredSimCardNumber: /^09|9[0-9a-zA-Z ]*/,
  desiredSimCardLandlineNumber: /^0[0-9a-zA-Z]/,
  desiredLandlinePhoneNumber: /^[0-9a-zA-Z ]*/,
  desiredPhoneMobileNumber: /(^09|9[0-9a-zA-Z ]*)|(0[0-8]{2}[0-9a-zA-Z ]*)/,
  phoneCode: /^021[0-9]*/,
  phoneAllCode: /^(021)?[0-9]*/,
  phoneWithZero: /^0[0-9]*/,
  postalCode: /^[0-9]*/,
  onlyEnglishText: /^[0-9a-zA-Z]*$/,
  domain: /^(([\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9][\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9-]{1,31}[\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9][.])+('net'|'org'|'co'|'it'|'au'|'ru'|'ca'|'jp'|'edu'|'gov'|com|ir|co.ir|ac.ir|id.ir|org.ir|sch.ir|gov.ir|net.ir|ایران))$/,
  minimum1000Price: /^[1-9][0-9]{3}[0-9]*$/,
  domainTwoLan: /^(([\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9][\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9-]{1,31}[\u0600-\u06FF٠١٢٣٤٥٦٧٨٩a-zA-Z0-9])+(.)[\u0600-\u06FFa-zA-Z]+)$/,
  /**
   * @description reference https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
   */
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // campaignUrl: /^[a-zA-Z]+[a-zA-Z0-9\/-]*$/,
  campaignUrl: /^[a-zA-Z]+[a-zA-Z0-9\-]*$/,
  englishNumber: /^\d+$/,
  discountCode: /^[0-9a-zA-Z]*$/,
  duolingoFaEnPattern: /^[\u0600-\u06FFa-zA-Z ]+$/,
      // productLink: /^[-\._~:/\?#\[\]@!\$&'\(\)\*\+,;=]+[\u0600-\u06FF0-9a-zA-Z]+[\u0600-\u06FF0-9a-zA-Z\\-]*(\/?[\u0600-\u06FF0-9a-zA-Z]+)(\?[\u0600-\u06FF0-9a-zA-Z]+(=[\u0600-\u06FF0-9a-zA-Z\\-]+[\u0600-\u06FF0-9a-zA-Z\\-]*)?(&[\u0600-\u06FF0-9a-zA-Z\\-]+(=[\u0600-\u06FF0-9a-zA-Z\\-]+[\u0600-\u06FF0-9a-zA-Z\\-]*)?)*?)?$/,
  productLink: /^(?=.{3,})([a-zA-Zآ-ی0-9\-._~:/?#\[\]@!$&'()*+,;=]+)$/,
}

export function hasFormNonRequiredError(form: NgForm) {
  let hasNonRequiredError = false;
  let formControls = form.form.controls;
  for (let field in formControls) {
    let errors: ValidationErrors | null | undefined = formControls[field].errors;
    hasNonRequiredError = hasNonRequiredError ||
        (errors !== null && errors !== undefined &&
            Object.keys(errors).filter(item => (item !== 'required' && item !== 'oneRequired')).length > 0);
    if (hasNonRequiredError) break
  }

  return hasNonRequiredError
}
