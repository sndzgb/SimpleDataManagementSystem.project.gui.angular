import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/read/user.model';
import { RolesService } from 'src/app/services/roles.service';
import { Role } from 'src/app/models/read/role.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';
import { EditUser } from 'src/app/models/write/edit-user.model';

@Component({
  selector: 'edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent extends FormComponent<EditUserComponent> implements OnInit, OnDestroy {

  userId: number | null = null;
  user: User | undefined;
  userRoles: Role[] | undefined;

  constructor(
    public authService: AuthService, 
    private usersService: UsersService, 
    private rolesService: RolesService,
    private router: Router
  ) {
    super();
  }

  override ngOnDestroy(): void {

    super.ngOnDestroy();
  }

  override ngOnInit(): void {

    super.ngOnInit();

    this.pathParmsChanged.subscribe(() => { 
      const uId = this.getPathParamValueByKey("userId")?.toString();
      if (!uId) {
        this.userId = null;
      } else {
        this.userId = +uId;
      }
    });


    this.formGroup.addControl("roleId", new FormControl(null, [ Validators.required ]));
    this.formGroup.addControl("username", new FormControl(null, [ Validators.required ]));
    


    this.usersService.getUser(this.userId!).subscribe(
      {
        complete: () => { 
        },
        error: (error: WebApiHttpError) => { 
          this.errors?.push(error);
        },
        next: (data) => {
          this.user = data;
          this.formGroup.patchValue({
            roleId: this.user.roleId,
            username: this.user.username
          });
          this.pageTitleService.editUserTitle = this.user.username!;
        }
      }
    );

    this.rolesService.getAllRoles().subscribe(
      {
        complete: () => { 
        },
        error: (error: WebApiHttpError) => { 
          this.errors?.push(error);
        },
        next: (data) => { 
          this.userRoles = data;
        }
      }
    );
  }
  
  onEditUserFormSubmitted() {

    this.errors = [];

    this.usersService.editUser(
      this.userId!,
      new EditUser(
        this.formGroup.value
      )
    ).subscribe(
      {
        complete: () => { 
        },
        error: (error: WebApiHttpError) => { 
          this.errors?.push(error);
        },
        next: (data) => { 
          this.router.navigate(['/users']);
        }
      }
    );

  }

}