import {Pipe, PipeTransform} from "@angular/core";
import {
  ColorInterface,
  CustomItem,
  DateInterface, FileInputInterFace, FormGroups, FormItemArray,
  TextInputInterface,
  FormFieldType,
  SelectInterface,
  SwitchInterface,
  TextAreaInterface,
  InputTypes
} from "../classes/form.base-class";

@Pipe({
  standalone: true,
  name: 'onionConflict'
})
export class OnionTypeConflictHandlerPipe implements PipeTransform {

  transform(value: FormFieldType, type: InputTypes): FormFieldType {
    debugger
    switch (type) {
      case InputTypes.TEXTAREA_TYPE:
        value as TextAreaInterface
        break;
      case InputTypes.SELECT_TYPE:
        value as SelectInterface
        break;
      case InputTypes.SWITCH_TYPE:
        value as SwitchInterface
        break;
      case InputTypes.FROM_DATE_TYPE:
        value as DateInterface
        break;
      case InputTypes.TO_DATE_TYPE:
        value as DateInterface
        break;
      case InputTypes.FORM_GROUP:
        value as FormGroups
        break;
      case InputTypes.FORM_ARRAY:
        value as FormItemArray
        break;
      case InputTypes.CUSTOM_FORM_ITEM:
        value as CustomItem
        break;
      case InputTypes.SECTION_TITLE:
        value as SelectInterface
        break;
      case InputTypes.INPUT_NUMBER_TYPE:
        value as TextInputInterface
        break;
      case InputTypes.INPUT_FILE:
        value as FileInputInterFace
        break;
      case InputTypes.COLOR_INPUT:
        value as ColorInterface
        break;
      case InputTypes.TEXT_INPUT_TYPE:
        value as TextInputInterface
    }
    console.log(typeof value);
    debugger
    return value;
  }
}
