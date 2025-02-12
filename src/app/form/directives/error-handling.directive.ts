import {Directive, ElementRef, HostListener, Inject, Input, OnInit, Optional, Renderer2, Self} from "@angular/core";
import {NgControl} from "@angular/forms";
import {DOCUMENT} from "@angular/common";


export const ERROR_MESSAGES = {
  required: () => 'this field is required',
  minlength: (value: any) => `this field must be greater than${value.requiredLength}`,
  maxlength: (value: any) => `this field must be greater than${value.requiredLength}`,
  pattern: () => 'incorrect format'
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
    const errors = Object.entries(this.ngControl?.errors || {});
    if (!errors.length) {
      return null
    }
    const [key, value] = errors[0];
    return (ERROR_MESSAGES as any)[key](value);
  }

  ngOnInit() {
    this.appendErrorMessageWrapper();

    this.ngControl?.valueChanges && this.ngControl.valueChanges.subscribe({
      next: (response => {
        if (this.ngControl.errors &&
          Array.from(Object.keys(this.ngControl.errors!))?.length) {
          this.showError();
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

  addMessageInsideP() {
    this.p.innerText = '';
    if (!(this.p.innerText.length)) {
      if (this.errorMessage) {
        this.text = this.renderer.createText(this.errorMessage);
        this.renderer.appendChild(this.p, this.text);
      }
    }
  }

  private showError() {
    this.addMessageInsideP();

    if (this.errorMessage) {
      if ((this.ngControl.value && this.ngControl.value.length > 0)) {
        // Append the paragraph to the host element
        this.renderer.addClass(this.p, 'd-inline-block');
      } else if (this.ngControl.value && this.ngControl.value.length == 0) {
        this.renderer.removeClass(this.p, 'd-inline-block');
      }
    } else if (!this.errorMessage && this.ngControl.valid) {
      this.renderer.removeClass(this.p, 'd-inline-block');
    }

  }

  @HostListener('click') onTouched(e: any) {
    if (this.errorMessage == ERROR_MESSAGES.required()) {
      this.addMessageInsideP();
      if (this.ngControl.errors &&
        Array.from(Object.keys(this.ngControl.errors!))?.length) {
        this.renderer.addClass(this.p, 'd-inline-block');
      } else {
        this.renderer.removeClass(this.p, 'd-inline-block');
      }
    }
  }

}
