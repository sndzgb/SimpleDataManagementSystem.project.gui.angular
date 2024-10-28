import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutableComponent } from '../../base/routable/routable.component';
import { User } from 'src/app/models/read/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class UserDetailsComponent extends RoutableComponent implements OnInit, OnDestroy {

  userId: number | null = null;
  user: User | undefined;
  
  constructor(
    public authService: AuthService, 
    private usersService: UsersService
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
          this.pageTitleService.userDetailsTitle = this.user?.username!;
        }
      }
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
