import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[integerOnly]'
})
export class IntegerOnlyDirective { // enables only 0-9 and one . characters

  constructor(private el: ElementRef) { 
    
  }

  regexStr: string = '^[-0-9]+$';

  @HostListener('keydown', [ '$event' ])
  onKeyDown($event: KeyboardEvent) {

    if (
      ($event.ctrlKey && $event.key.toLowerCase() == "a")
      ||
      ($event.ctrlKey && $event.key.toLowerCase() == "c")
      ||
      ($event.ctrlKey && $event.key.toLowerCase() == "v")
      ||
      ($event.key.toLowerCase() == "backspace")
      ||
      ($event.key.toLowerCase() == "tab")
      ||
      ($event.key.toLowerCase() == "arrowright" || $event.key.toLowerCase() == "arrowleft")
    ) {
      return true;
    }

    return new RegExp(this.regexStr).test($event.key);
  }


  // TODO finish
  // CHECK IF CONTAINS ANYTHING OTHER THAN ONE '.' AND/ OR '0-9'
  // STARTS WITH > '0', AND STARTS WITH NUMBER BEFORE '.'
  @HostListener("paste", [ '$event' ])
  onPaste($event: ClipboardEvent) { // ClipboardEvent KeyboardEvent
    
    let dataToPaste = $event!.clipboardData!.getData('text');

    if (new RegExp(this.regexStr).test(dataToPaste)) {
      return true;
    } else {
      return false;
    }
  }

}
