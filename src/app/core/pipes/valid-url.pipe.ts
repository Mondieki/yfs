import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validURL'
})
export class ValidURLPipe implements PipeTransform {

  transform(url: string): string {
    // Check if the URL is valid
    if (this.isValidUrl(url)) {
      // Check if the URL already has a https:// prefix
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Add https:// prefix
        return `https://${url}`;
      }
      return url;
    } else {
      // Return original URL or handle invalid URL as required
      if(url.startsWith('www.')) {
        return `https://${url}`;
      }
      return url;
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

}
