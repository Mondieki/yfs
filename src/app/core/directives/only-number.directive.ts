import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const inputValue: string = this.el.nativeElement.value;

    // Use a regular expression to replace all non-numeric characters with an empty string
    this.el.nativeElement.value = inputValue.replace(/[^0-9]/g, '');

    // If after the replacement the value has changed, then trigger the input event again
    if (inputValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}