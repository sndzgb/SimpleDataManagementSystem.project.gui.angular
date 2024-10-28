import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AppPermissions } from 'src/app/constants/app-permissions.enum';
import { Roles } from 'src/app/constants/roles';
import { AuthenticationItems } from 'src/app/services/auth.service';

@Component({
  selector: 'base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  
  appPermissions: typeof AppPermissions = AppPermissions;
  authenticationItems: typeof AuthenticationItems = AuthenticationItems;
  roles: typeof Roles = Roles;

  ngOnInit(): void {  
  }

  ngOnDestroy(): void {
  }
  
}
