import { DestroyRef, Directive, ElementRef, HostListener, inject, Inject, Input, OnInit, Optional, Renderer2, Self } from "@angular/core";
import { NgControl } from "@angular/forms";
import { DOCUMENT } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export const ERROR_MESSAGES = {
  required: () => 'this field is required',
  minlength: (value: any) => `this field must be greater than${value.requiredLength}`,
  maxlength: (value: any) => `this field must be greater than${value.requiredLength}`,
  pattern: () => 'incorrect format',
  email: () => 'incorrect format',
}


@Directive({
  selector: '[handelError]',
  standalone: true,
})

export class ErrorHandlingDirective implements OnInit {

  p: any;
  text: any = null;
  private destroyRef = inject(DestroyRef);
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

    this.ngControl?.valueChanges?.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response => {

        const parentElement = this.elementRef.nativeElement.parentElement;
        const existingParagraph = parentElement.querySelector('p.invalid-feedback');

        if (response && this.ngControl.errors &&
          Array.from(Object.keys(this.ngControl.errors!))?.length) {
          this.showError();
        } else {
          if (existingParagraph) {
            this.renderer.removeClass(existingParagraph, 'd-inline-block');

          }
        }
      })
    })
  }

  private appendErrorMessageWrapper() {
    const parentElement = this.elementRef.nativeElement.parentElement;
    const existingParagraph = parentElement.querySelector('p.invalid-feedback');
    if (!existingParagraph) {
      this.p = this.renderer.createElement('p');
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.p);
      this.renderer.addClass(this.p, 'invalid-feedback');
    }
  }

  addMessageInsideP() {
    const parentElement = this.elementRef.nativeElement.parentElement;
    const existingParagraph = parentElement.querySelector('p.invalid-feedback');

    if (existingParagraph) {
      existingParagraph.innerText = '';
      if (!(existingParagraph.innerText.length)) {
        if (this.errorMessage) {
          this.text = this.renderer.createText(this.errorMessage);
          this.renderer.appendChild(existingParagraph, this.text);
        }
      }
    }
  }

  private showError() {
    this.addMessageInsideP();

    const parentElement = this.elementRef.nativeElement.parentElement;
    const existingParagraph = parentElement.querySelector('p.invalid-feedback');

    if (existingParagraph) {
      if (this.errorMessage) {
        if ((this.ngControl.value && this.ngControl.value.length > 0)) {
          // Append the paragraph to the host element
          this.renderer.addClass(existingParagraph, 'd-inline-block');
        } else if (this.ngControl.value && this.ngControl.value.length == 0) {
          this.renderer.removeClass(existingParagraph, 'd-inline-block');
        }
      } else if (!this.errorMessage && this.ngControl.valid) {
        this.renderer.removeClass(existingParagraph, 'd-inline-block');
      }
    }

  }

  @HostListener('click') onTouched(e: any) {

    const parentElement = this.elementRef.nativeElement.parentElement;
    const existingParagraph = parentElement.querySelector('p.invalid-feedback');

    if (this.errorMessage == ERROR_MESSAGES.required()) {
      this.addMessageInsideP();
      if (this.ngControl.errors &&
        Array.from(Object.keys(this.ngControl.errors!))?.length) {
        this.renderer.addClass(existingParagraph, 'd-inline-block');
      } else {
        this.renderer.removeClass(existingParagraph, 'd-inline-block');
      }
    }
  }

}
