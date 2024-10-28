import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/read/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoutableComponent } from '../../base/routable/routable.component';
import { WebApiHttpError } from 'src/app/errors/web-api-http-error.error';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends RoutableComponent implements OnInit {


  take: string = "8";
  page: string = "1";
  users: Users | undefined;


  constructor(
    private usersService: UsersService, 
    public authService: AuthService
  ) {
    super();
  }

  override ngOnInit(): void {

    super.ngOnInit();
    this.pageTitleService.usersTitle;

    this.queryParamsChanged.subscribe(() => {
      this.take = this.getQueryParamValueByKey("take") ?? this.take;
      this.page = this.getQueryParamValueByKey("page") ?? this.page;

      this.usersService.getUsers(this.take, this.page).subscribe(
        {
          complete: () => { 
          },
          error: (error: WebApiHttpError) => { 
            this.errors?.push(error);
          },
          next: (data) => {
            this.users = data;
          }
        }
      );
    });

    
  }

}
