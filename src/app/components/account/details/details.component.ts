import { Component, OnInit } from "@angular/core";
import { AccountsService } from "src/app/services/accounts.service";
import { UserDetails } from "src/app/models/read/user-details.model";
import { RoutableComponent } from "../../base/routable/routable.component";

@Component({
    selector: 'account-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class AccountDetailsComponent extends RoutableComponent implements OnInit {
    
    account: UserDetails | null = null;

    constructor(private accountsService: AccountsService) {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.accountsService.getAccountDetails().subscribe(
            {
                complete: () => { 
                },
                error: (error) => { 
                    this.errors.push(error);
                },
                next: (data) => {
                    this.account = data;
                    this.pageTitleService.accountDetailsTitle = this.account.username ?? "";
                }
            }
        );
    }
}