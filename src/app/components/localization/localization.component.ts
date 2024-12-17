import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NonRoutableComponent } from '../base/non-routable/non-routable.component';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})
export class LocalizationComponent extends NonRoutableComponent implements OnInit {

  public supportedCultures: string[] = ["en-US", "hr-HR"];
  // private selectedLanguage: i18n = i18n['en-US'];
  public selectedLanguage: string = "en-US";
  public isCollapsed: boolean = true;


  // TODO get active route; or request index.html?
  // TODO https://phrase.com/blog/posts/angular-localization-i18n/
  // locales = [
  //   { code: 'en-US', name: 'English' },
  //   { code: 'hr-HR', name: 'Croatian' },
  // ];
  // constructor(
  //   @Inject(LOCALE_ID) public activeLocale: string
  // ) {
  //   super();
  // }


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localizationService: LocalizationService,
    @Inject(LOCALE_ID) public activeLocale: string
  ) {
    super();
    console.log("ctor()");
    this.selectedLanguage = this.localizationService.getLanguage();
  }
  
  override ngOnInit(): void {
    super.ngOnInit();
    console.log("onInit()");
  }
  
  src: string = `./assets/resources/${this.activeLocale}.png`;

  public toggleLanguageDropdown($event: MouseEvent) {
    this.isCollapsed = !this.isCollapsed;
  }

  public changeLanguage(language: string): void {
    console.log(language);
    
    this.isCollapsed = true;
    this.selectedLanguage = language;
    //this.localizationService.setLanguage(language);

    // console.log("activatedRoute:");
    // console.log(this.activatedRoute.url);
    // console.log("router:");
    // console.log(this.router.url);
    // return;
    window.location.href = `/${language}`; // + `${this.router.url}`;


    // this.router.navigate(
    //   [], 
    //   {
    //     relativeTo: this.activatedRoute,
    //     queryParamsHandling: 'merge',
    //   }
    // );



    //this.router.navigateByUrl("/items");
  }
}

export enum i18n {
  "en-US" = "en-us",
  "hr-HR" = "hr-HR"
}