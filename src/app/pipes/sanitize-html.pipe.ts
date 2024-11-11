import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  pure: true
})
export class SanitizeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: any, args?: any) : any {
        let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, value);
        return this.sanitizer.bypassSecurityTrustHtml(sanitized ?? '');
    }
}
  