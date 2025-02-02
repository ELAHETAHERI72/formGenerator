import {Directive, ElementRef, HostListener, Inject, Input, OnInit, Optional, Renderer2, Self} from "@angular/core";
import {NgControl} from "@angular/forms";
import {DOCUMENT} from "@angular/common";


export const ERROR_MESSAGES = {
  required: 'this field is required',
  minlength: 'this field must be greater than',
  maxlength: 'this field must be greater than',

}


@Directive({
  selector: 'input[handelError]',
  standalone: true,
})

export class ErrorHandlingDirective implements OnInit {

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  get errorMessage(): string | null {
    const errors = Object.entries(this.ngControl.errors || {});
    if (!errors.length) {
      return null
    }
    const [key, value] = errors[0];
    return (ERROR_MESSAGES as any)[key];
  }

  ngOnInit() {

    this.ngControl.valueChanges && this.ngControl.valueChanges.subscribe({
      next: (response => {
        if (this.ngControl.errors &&
          Array.from(Object.keys(this.ngControl.errors!))?.length) {
          this.showError()
        } else {

        }
      })
    })
  }

  private showError() {
    let p = null;
    let text = null;
    const hasPChild = Array.from(this.elementRef.nativeElement.parentElement.children).some((child: any) => child.tagName === 'P');


    if (this.errorMessage) {
      p = this.renderer.createElement('p');
      // Add the class to the element
      if ((this.ngControl.value.length > 0) && !hasPChild) {
        text = this.renderer.createText(this.errorMessage);
        this.renderer.appendChild(p, text);
        // Append the paragraph to the host element
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, p);
        this.renderer.addClass(p, 'invalid-feedback');
        this.renderer.addClass(p, 'd-inline-block');
      } else if (this.ngControl.value.length == 0 && hasPChild) {
        debugger
        this.renderer.removeClass(p, 'd-inline-block');
      }


    }


  }

}
