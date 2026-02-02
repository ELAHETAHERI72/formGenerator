import {Pipe, PipeTransform} from "@angular/core";
import {
  ColorInterface,
  CustomItem,
  DateInterface, FileInputInterFace, FormGroups, FormItemArray,
  InputInterface,
  FormFieldType,
  SelectInterface,
  SwitchInterface,
  TextAreaInterface,
  Types
} from "../classes/form.base-class";

@Pipe({
  standalone: true,
  name: 'onionConflict'
})
export class OnionTypeConflictHandlerPipe implements PipeTransform {

  transform(value: FormFieldType, type: Types): FormFieldType {
    debugger
    switch (type) {
      case Types.TEXTAREA_TYPE:
        value as TextAreaInterface
        break;
      case Types.SELECT_TYPE:
        value as SelectInterface
        break;
      case Types.SWITCH_TYPE:
        value as SwitchInterface
        break;
      case Types.FROM_DATE_TYPE:
        value as DateInterface
        break;
      case Types.TO_DATE_TYPE:
        value as DateInterface
        break;
      case Types.FORM_GROUP:
        value as FormGroups
        break;
      case Types.FORM_ARRAY:
        value as FormItemArray
        break;
      case Types.CUSTOM_FORM_ITEM:
        value as CustomItem
        break;
      case Types.SECTION_TITLE:
        value as SelectInterface
        break;
      case Types.INPUT_NUMBER_TYPE:
        value as InputInterface
        break;
      case Types.INPUT_FILE:
        value as FileInputInterFace
        break;
      case Types.COLOR_INPUT:
        value as ColorInterface
        break;
      case Types.INPUT_TYPE:
        value as InputInterface
    }
    console.log(typeof value);
    debugger
    return value;
  }
}
