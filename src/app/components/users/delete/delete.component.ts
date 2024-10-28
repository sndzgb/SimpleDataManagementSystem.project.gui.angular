import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/read/user.model';
import { FormComponent } from '../../base/form/form.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'delete-user',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteUserComponent extends FormComponent<User> implements OnInit, OnDestroy {

  userId: number | null = null;
  user: User | null = null;
  
  constructor(
    public authService: AuthService, 
    private usersService: UsersService,
    private router: Router
  ) {
    super();
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

    this.usersService.getUser(this.userId!).subscribe(
      {
        complete: () => { 
        },
        error: (error: WebApiHttpError) => { 
          this.errors?.push(error);
        },
        next: (data) => {
          this.user = data;
          this.pageTitleService.deleteUserTitle = this.user.username!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onDeleteUserClicked() {
    this.usersService.deleteUser(this.userId!).subscribe(
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
