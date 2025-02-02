import {Directive, ElementRef, HostListener, Inject, Input, OnInit, Optional, Renderer2, Self} from "@angular/core";
import {NgControl} from "@angular/forms";
import {DOCUMENT} from "@angular/common";


export const ERROR_MESSAGES = {
  required: 'this field is required',
  minlength: 'this field must be greater than',
  maxlength: 'this field must be greater than',

}


@Directive({
    selector: '[handelError]',
  standalone: true,
})

export class ErrorHandlingDirective implements OnInit {

  p: any = null;
  text: any = null;

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
    this.appendErrorMessageWrapper();

    this.ngControl.valueChanges && this.ngControl.valueChanges.subscribe({
      next: (response => {
        if (this.ngControl.errors &&
          Array.from(Object.keys(this.ngControl.errors!))?.length) {
          this.showError()
        } else {
          this.renderer.removeClass(this.p, 'd-inline-block');
        }
      })
    })
  }

  private appendErrorMessageWrapper() {
    this.p = this.renderer.createElement('p');
    this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.p);
    this.renderer.addClass(this.p, 'invalid-feedback');
  }

  private showError() {

    if (this.errorMessage) {
      if (!(this.p.innerText.length)) {
        this.text = this.renderer.createText(this.errorMessage);
        this.renderer.appendChild(this.p, this.text);
      }

      if ((this.ngControl.value.length > 0)) {
        // Append the paragraph to the host element
        this.renderer.addClass(this.p, 'd-inline-block');
      } else if (this.ngControl.value.length == 0) {
        this.renderer.removeClass(this.p, 'd-inline-block');
      }
    } else if (!this.errorMessage && this.ngControl.valid) {
      this.renderer.removeClass(this.p, 'd-inline-block');
    }

  }

}
