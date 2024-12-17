import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule, RoutableComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users/users.component';
import { CreateUserComponent } from './components/users/create/create.component';
import { ItemsComponent } from './components/items/items/items.component';
import { CreateItemComponent } from './components/items/create/create.component';
import { DeleteUserComponent } from './components/users/delete/delete.component';
import { ItemDetailsComponent } from './components/items/details/details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ToastComponent } from './components/toast/toast.component';
import { HttpRequestAppendJwtHeaderInterceptor } from './interceptors/http-request-append-jwt-header.interceptor';
import { HttpResponseRefreshAuthorizationHeaderInterceptor } from './interceptors/http-response-refresh-authorization-header.interceptor';
import { GlobalErrorHandler } from './error-handling/global-error-handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/account/login/login.component';
import { AppConfigurationService } from './services/app-configuration.service';
import { ColorGeneratorPipe } from './pipes/color-generator.pipe';
import { LogoutComponent } from './components/account/logout/logout.component';
import { EditItemComponent } from './components/items/edit/edit.component';
import { PagerComponent } from './components/pager/pager.component';
import { LoadingDirective } from './directives/loading.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DeleteItemComponent } from './components/items/delete/delete.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { VisibleIfHasPermissionsDirective } from './directives/authorization/visible-if-has-permissions.directive';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { EditUserComponent } from './components/users/edit/edit.component';
import { AccountDetailsComponent } from './components/account/details/details.component';
import { PasswordChangeComponent } from './components/account/password-change/password-change.component';
import { CreateCategoryComponent } from './components/categories/create/create.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { DeleteCategoryComponent } from './components/categories/delete/delete.component';
import { EditCategoryComponent } from './components/categories/edit/edit.component';
import { CategoryDetailsComponent } from './components/categories/details/details.component';
import { RetailersComponent } from './components/retailers/retailers/retailers.component';
import { CreateRetailerComponent } from './components/retailers/create/create.component';
import { DeleteRetailerComponent } from './components/retailers/delete/delete.component';
import { RetailerDetailsComponent } from './components/retailers/details/details.component';
import { EditRetailerComponent } from './components/retailers/edit/edit.component';
import { IntegerOnlyDirective } from './directives/integer-only.directive';
import { HttpErrorsDisplayComponent } from './components/http-errors-display/http-errors-display.component';
import { FormRequiredFieldsMessageComponent } from './components/form-required-fields-message/form-required-fields-message.component';
import { EmbeddedFormComponent } from './components/base/embedded-form/embedded-form.component';
import { UserDetailsComponent } from './components/users/details/details.component';
import { ItemsSearchComponent } from './components/items/search/search.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { BooleanToYesNoPipe } from './pipes/boolean-to-yes-no.pipe';
import { NotificationsSidebarComponent } from './components/notifications-sidebar/notifications-sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LocalizationComponent } from './components/localization/localization.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUserComponent,
    CreateItemComponent,
    ItemsComponent,
    DeleteUserComponent,
    ToastComponent, // non-routable
    ItemDetailsComponent,
    NavbarComponent, // non-routable
    PageNotFoundComponent,
    HomeComponent,
    FooterComponent, // non-routable
    SpinnerComponent, // non-routable
    UnauthorizedComponent, 
    ToastComponent,
    NumbersOnlyDirective,
    LoginComponent,
    ColorGeneratorPipe,
    BooleanToYesNoPipe,
    SanitizeHtmlPipe,
    LogoutComponent,
    EditItemComponent,
    PagerComponent,
    LoadingDirective,
    VisibleIfHasPermissionsDirective,
    FileUploadComponent,
    DeleteItemComponent,
    ForbiddenComponent,
    GoBackComponent,
    EditUserComponent,
    AccountDetailsComponent,
    PasswordChangeComponent,
    CreateCategoryComponent,
    CategoriesComponent,
    DeleteCategoryComponent,
    EditCategoryComponent,
    CategoryDetailsComponent,
    RetailersComponent,
    CreateRetailerComponent,
    DeleteRetailerComponent,
    RetailerDetailsComponent,
    EditRetailerComponent,
    HttpErrorsDisplayComponent,
    IntegerOnlyDirective,
    FormRequiredFieldsMessageComponent,
    EmbeddedFormComponent,
    UserDetailsComponent,
    ItemsSearchComponent,
    NotificationComponent,
    NotificationsSidebarComponent,
    LocalizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestAppendJwtHeaderInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpResponseRefreshAuthorizationHeaderInterceptor, multi: true },
      { provide: ErrorHandler, useClass: GlobalErrorHandler },
      {
        provide: APP_INITIALIZER,
        multi: true,
        deps: [AppConfigurationService],
        useFactory: (appConfigService: AppConfigurationService) => {
          return () => {
            return appConfigService.loadAppConfig(); // must return a promise
          };
        }
      },
      [ ColorGeneratorPipe, BooleanToYesNoPipe ]
  ],
  exports: [ ColorGeneratorPipe, BooleanToYesNoPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
