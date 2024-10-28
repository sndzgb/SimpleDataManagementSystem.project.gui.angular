import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ItemsComponent } from './components/items/items/items.component';
import { HomeComponent } from './components/home/home.component';
import { CreateItemComponent } from './components/items/create/create.component';
import { Roles } from './constants/roles';
import { isInRoleGuard } from './route-guards/is-in-role.guard';
import { ItemComponent } from './components/items/item/item.component';
import { LoginComponent } from './components/account/login/login.component';
import { EditItemComponent } from './components/items/edit/edit.component';
import { DeleteItemComponent } from './components/items/delete/delete.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { isAuthenticatedGuard } from './route-guards/is-authenticated.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LogoutComponent } from './components/account/logout/logout.component';
import { AccountDetailsComponent } from './components/account/details/details.component';
import { UsersComponent } from './components/users/users/users.component';
import { CreateUserComponent } from './components/users/create/create.component';
import { EditUserComponent } from './components/users/edit/edit.component';
import { DeleteUserComponent } from './components/users/delete/delete.component';
import { PasswordChangeComponent } from './components/account/password-change/password-change.component';
import { passwordChangeRequiredGuard } from './route-guards/password-change-required.guard';
import { CreateCategoryComponent } from './components/categories/create/create.component';
import { CategoriesComponent } from './components/categories/categories/categories.component';
import { EditCategoryComponent } from './components/categories/edit/edit.component';
import { DeleteCategoryComponent } from './components/categories/delete/delete.component';
import { CategoryDetailsComponent } from './components/categories/details/details.component';
import { ItemDetailsComponent } from './components/items/details/details.component';
import { RetailersComponent } from './components/retailers/retailers/retailers.component';
import { CreateRetailerComponent } from './components/retailers/create/create.component';
import { DeleteRetailerComponent } from './components/retailers/delete/delete.component';
import { RetailerDetailsComponent } from './components/retailers/details/details.component';
import { EditRetailerComponent } from './components/retailers/edit/edit.component';
import { UserDetailsComponent } from './components/users/details/details.component';

const appName = 'Simple Data Management System'; // for setting a page title

const routes: Routes = [
  {path: '', 
    canActivate: [isAuthenticatedGuard],
    canActivateChild: [passwordChangeRequiredGuard], // isAuthenticatedGuard
    children: [
      {path: '', component: HomeComponent},
      {path: 'account', component: AccountDetailsComponent},
      {
        path: 'items', canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]},
        children: [
          {path: '', component: ItemsComponent},
          {path: 'create', component: CreateItemComponent},
          {path: ':itemId/edit', component: EditItemComponent},
          {path: ':itemId/delete', component: DeleteItemComponent},
          {path: ':itemId/details', component: ItemDetailsComponent},
        ]
      },
      {
        path: 'users', canActivate: [isInRoleGuard], data: {roles: [Roles.Admin]},
        children: [
          {path: '', component: UsersComponent},
          {path: 'create', component: CreateUserComponent},
          {path: ':userId/edit', component: EditUserComponent},
          {path: ':userId/delete', component: DeleteUserComponent},
          {path: ':userId/details', component: UserDetailsComponent},
        ]
      },
      {
        path: 'categories',
        children: [
          {path: '', component: CategoriesComponent},
          {path: 'create', component: CreateCategoryComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':categoryId/edit', component: EditCategoryComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':categoryId/delete', component: DeleteCategoryComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':categoryId/details', component: CategoryDetailsComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}}
        ]
      },
      {
        path: 'retailers',
        children: [
          {path: '', component: RetailersComponent},
          {path: 'create', component: CreateRetailerComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':retailerId/edit', component: EditRetailerComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':retailerId/delete', component: DeleteRetailerComponent, 
            canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}},
          {path: ':retailerId/details', component: RetailerDetailsComponent
            //canActivate: [isInRoleGuard], data: {roles: [Roles.Admin, Roles.Employee]}
          }
        ]
      }
    ]
  },
  {path: 'account/password-change', component: PasswordChangeComponent, pathMatch: "full", canActivate: [isAuthenticatedGuard]},
  {path: 'account/login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'unauthorized', component: UnauthorizedComponent},
  
  {path: 'not-found', component: PageNotFoundComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO finish...
export const RoutableComponents = [
  HomeComponent,
  ItemsComponent,
  PageNotFoundComponent
]
