import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private readonly defaultLanguage: string = "en-US";
  private selectedLanguage?: string | null;

  constructor() { 

  }

  getLanguage(): string {
    return this.selectedLanguage ?? this.defaultLanguage;
  }

  setLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.selectedLanguage = language;
  }
}
