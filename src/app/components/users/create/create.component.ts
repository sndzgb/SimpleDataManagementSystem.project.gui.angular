import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/constants/roles';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { CreateUser } from 'src/app/models/write/create-user.model';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { Role } from 'src/app/models/read/role.model';

@Component({
  selector: 'create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateUserComponent extends FormComponent<CreateUser> implements OnInit, OnDestroy {
  
  assignableRoles: Array<Role> | undefined;

  constructor(
    private router: Router, 
    private rolesService: RolesService, 
    private usersService: UsersService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.formGroup.addControl("username", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("password", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("roleId", new FormControl(Roles.Employee, [ Validators.required ]));




    this.rolesService.getAllRoles().subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: (data) => {
          this.assignableRoles = data.roles?.splice(1, 2); // remove "Admin" role
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onCreateUserFormSubmitted(): void {

    this.usersService.createUser(
      new CreateUser(
        this.formGroup.value
      )
    ).subscribe(
      {
        complete: () => {
        },
        error: (error: WebApiHttpError) => {
          this.errors?.push(error);
        },
        next: () => {
          this.router.navigate(["/users"]);
        }
      }
    );
  }

}
