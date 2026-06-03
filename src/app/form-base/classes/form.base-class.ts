import {BehaviorSubject, Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {signal, TemplateRef, WritableSignal} from "@angular/core";


export enum InputTypes {
  TEXT_INPUT_TYPE = 'TEXT_INPUT_TYPE',
  TEXTAREA_TYPE = 'TEXTAREA_TYPE',
  SELECT_TYPE = 'SELECT_TYPE',
  SWITCH_TYPE = 'SWITCH_TYPE',
  FROM_DATE_TYPE = 'FROM_DATE_TYPE',
  TO_DATE_TYPE = 'TO_DATE_TYPE',
  FORM_GROUP = 'FORM_GROUP',
  FORM_ARRAY = 'FORM_ARRAY',
  CUSTOM_FORM_ITEM = 'CUSTOM_FORM_ITEM',
  BORDER_LINE = 'BORDER_LINE',
  SECTION_TITLE = 'SECTION_TITLE',
  INPUT_NUMBER_TYPE = 'INPUT_NUMBER_TYPE',
  INPUT_FILE = 'INPUT_FILE',
  COLOR_INPUT = 'COLOR_INPUT',
  GALLERY = 'GALLERY',
}


export class FormItemBase {
  inputType: InputTypes;
  className?: string;

  constructor(item: FormItemBase) {

    this.inputType = item.inputType;
    this.className = item.className ?? 'col-lg-3';

  }
}

export class CommonFieldsInterface {
  bindItem: string;
  id: string;
  labelName: string;
  min?: string;
  minLength?: number | string | null;
  max?: string;
  maxLength?: number | string | null;
  disable?: boolean;
  isRequired: boolean | string;
  changeValue$?: Observable<any> | BehaviorSubject<any>;
  defaultValue?: any;
  errorItems?: ErrorInterface | any;
  pattern?: string | any;
  isDisPlayed?: boolean = false;
  placeholder?: (index: number) => string; // if it`s used on form array we can have index of form group
  emitFormItems?: (item: any) => void;
  isDisplayedSignal?: WritableSignal<any> = signal(true);

  constructor(item: CommonFieldsInterface) {
    this.bindItem = item.bindItem;
    this.id = item.id;
    this.labelName = item.labelName;
    this.placeholder = item.placeholder;
    this.min = item.min ?? undefined;
    this.minLength = item.minLength ?? null;
    this.max = item.max ?? undefined;
    this.maxLength = item.maxLength ?? null;
    this.disable = item.disable ?? false;
    this.isRequired = item.isRequired;
    this.defaultValue = item.defaultValue;
    this.changeValue$ = item.changeValue$;
    this.errorItems = item.errorItems;
    this.pattern = item.pattern;
    this.isDisPlayed = item.isDisPlayed;
    this.emitFormItems = item.emitFormItems;
    this.isDisplayedSignal = item.isDisplayedSignal ?? signal(true);
  }

}

export type borderLine = Pick<FormItemBase, 'inputType'>;

export class TextInputInterface extends FormItemBase{

  constructor(item: TextInputInterface) {
    super(item);

  }

}

export class SelectInterface extends FormItemBase {

  fields: Array<any> | Observable<Array<any>>;
  hasApi?: boolean;
  apiUrl?: string;
  addItemFromOutSide?: boolean;
  bindLabel: string;
  bindId: string;
  selectionChange: (config: SelectInterface, value: any) => void;

  constructor(item: SelectInterface) {
    super(item);
    this.fields = item.fields;
    this.changeValue$ = item.changeValue$;
    this.hasApi = item.hasApi;
    this.apiUrl = item.apiUrl;
    this.addItemFromOutSide = item.addItemFromOutSide;
    this.bindLabel = item.bindLabel;
    this.bindId = item.bindId;
    this.selectionChange = item.selectionChange;
  }

}

export class ColorInterface extends FormItemBase {

  constructor(item: ColorInterface) {
    super(item);
    this.changeValue$ = item.changeValue$;

  }

}

export class DateInterface extends FormItemBase {
  minDate?: string;
  maxDate?: string;

  constructor(item: DateInterface) {
    super(item);
    this.minDate = item.minDate;
    this.maxDate = item.maxDate;

  }

}

export class GalleryBaseInterface extends FormItemBase {
  altName: string;
  type: 'photo' | 'video' | 'file';
  choiceItemLabelName: string;
  hasRemoveBtn: boolean;

  constructor(item: GalleryBaseInterface) {
    super(item);
    this.bindItem = item.bindItem;
    this.altName = item.altName;
    this.type = item.type;
    this.choiceItemLabelName = item.choiceItemLabelName;
    this.hasRemoveBtn = item.hasRemoveBtn ?? true;
  }

}

export class TextAreaInterface extends FormItemBase {

  cols?: string;
  rows?: string;

  constructor(item: TextAreaInterface) {
    super(item);
    this.cols = item.cols ?? '10';
    this.rows = item.rows ?? '4';
  }
}

export class SwitchInterface extends FormItemBase {
  isSelect?: boolean;

  constructor(item: SwitchInterface) {
    super(item)
    this.isSelect = item.isSelect;

  }
}

export class FormGroups extends FormItemBase {
  formItems: Array<FormFieldType> = [];

  constructor(item: FormGroups) {
    super(item)
    this.formItems = item.formItems;

  }
}

export class CustomItem extends FormItemBase {
  template?: TemplateRef<string>;
  templateName?: string;

  constructor(item: CustomItem) {
    super(item);
    this.template = item.template;
    this.templateName = item.templateName;
  }
}


export class LineInterface extends FormItemBase {

  constructor(item: LineInterface) {
    super(item);
  }
}

export class SectionTitleModel extends FormItemBase {
  constructor(item: SectionTitleModel) {
    super(item);
  }
}

export interface ErrorInterface {
  patternErrorMsg?: string;
  oneRequiredErrorMsg?: string;
  errorMessage?: string;
  waitForTouch?: boolean;
  showRequiredError?: boolean;
}


export class FormItemArray extends FormItemBase {
  hasAddButton?: boolean;
  formArrayFields: Array<FormGroups> = [];
  hasDeleteButton: boolean;
  addText?: string;
  removeText?: string;
  maxItemAddLength?: number;
  maxLengthMessage?: string;
  addFormArrayField?: (formArrayFields: Array<FormGroups>) => void;

  constructor(item: FormItemArray) {
    super(item)
    this.hasAddButton = item.hasAddButton;
    this.formArrayFields = item.formArrayFields;
    this.hasDeleteButton = item.hasDeleteButton;
    this.addFormArrayField = item.addFormArrayField;
    this.addText = item.addText;
    this.removeText = item.removeText;
    this.maxItemAddLength = item.maxItemAddLength;
    this.maxLengthMessage = item.maxLengthMessage;
  }
}

export class FileInputInterFace extends FormItemBase {
  maxSize?: number;
  sizeLimit: string | undefined;
  validFormats?: string[] = [];
  hasPreview?: boolean;
  uploadStatus?: boolean;
  isUploadToServer?: boolean;

  constructor(item: FileInputInterFace) {
    super(item);
    this.maxSize = item.maxSize;
    this.validFormats = item.validFormats;
    this.sizeLimit = item.sizeLimit;
    this.bindItem = item.bindItem;
    this.hasPreview = item.hasPreview;
    this.uploadStatus = item.uploadStatus;
    this.isUploadToServer = item.isUploadToServer ?? true;
  }
}

export type FormFieldType =
  SelectInterface
  | TextInputInterface
  | TextAreaInterface
  | SwitchInterface
  | CustomItem
  | FileInputInterFace
  | LineInterface
  | SectionTitleModel;

export class FormConfig {
  items: Array<FormFieldType>;
  outPutItems?: Array<FormFieldType>;
  classList: string;
  formName: NgForm;
  restOfApiPath?: string | number;
  hasApiCall: boolean;
  hasSaveBtn?: boolean;
  submitted: (items: any, isLoaded: boolean) => void;
  formId?: string;
  isCheckFormValid?: boolean;
  setValueAfterApiCall?: WritableSignal<any> = signal(null);
  dataWasUpdated?: WritableSignal<boolean> = signal(false);

  constructor(
    config: {
      items: Array<FormFieldType>,
      submitted: (items: any, isLoaded: boolean) => void,
      classList: string,
      formName: NgForm,
      formId: string,
      restOfApiPath?: string | number,
      isCheckFormValid: boolean,
      hasApiCall: boolean,
      setValueAfterApiCall: WritableSignal<any>,
      dataWasUpdated?: WritableSignal<false>,
      hasSaveBtn?: boolean
    }) {
    this.items = config.items;
    this.classList = config.classList;
    this.formId = config.formId;
    this.submitted = config.submitted;
    this.formName = config.formName;
    this.isCheckFormValid = config.isCheckFormValid;
    this.hasApiCall = config.hasApiCall ?? false;
    this.setValueAfterApiCall = config.setValueAfterApiCall;
    this.dataWasUpdated = config.dataWasUpdated;
    this.hasSaveBtn = config.hasSaveBtn ?? true;
    this.restOfApiPath = config.restOfApiPath;
  }
}
