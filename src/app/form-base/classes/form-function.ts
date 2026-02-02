import {FormFieldType, SelectInterface} from "./form.base-class";

export class FormFunction {

  // on selection change

  selectionChange(value: SelectInterface | FormFieldType, event: HTMLInputElement) {
    // if ((value as SelectInterface).addItemFromOutSide) { // if has input items from outside do this
    //   (value as SelectInterface).emitFormItems?.({items: this.items, $event: event});
    //   this.emitNewDomeItemFromOutside.emit({items: this.items})
    // } else { // if a simple select without items from outside do this
    //   value.emitFormItems?.({bindItems: this.bindItemField, $event: event});
    //
    // }
  }

  addItemFromOutside(value: SelectInterface | FormFieldType, event: HTMLInputElement) {
    // (value as SelectInterface).emitFormItems?.({items: this.items, $event: event});

  }


  //  select file from file
  
  // selectFileInput(value: InputTYpe, $event: any) {
  //   this.bindItems[value.bindItem] = $event.name;
  //
  //   if ((value as FileInputInterFace) && $event) {
  //     if ((value as FileInputInterFace).isUploadToServer) {
  //       (value as FileInputInterFace).uploadStatus?.loading();
  //       value.emitFormItems?.($event);
  //       this.fileService.uploadFile($event).pipe(
  //         takeUntilDestroyed(this.destroyRef)
  //       ).subscribe({
  //         next: (response: any) => {
  //           if (response && value) {
  //             this.bindItems[value.bindItem] = response;
  //             (value as FileInputInterFace).uploadStatus?.resolved();
  //           }
  //         },
  //         error: err => {
  //           this.toasterService.error(errors.errorOccurred);
  //           (value as FileInputInterFace).uploadStatus?.error();
  //         }
  //       })
  //     } else {
  //       value.emitFormItems?.({item: value, select: $event});
  //     }
  //   }
  // }
}
