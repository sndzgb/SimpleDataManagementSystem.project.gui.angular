import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class PageTitleService {
    
    private readonly appName = "Simple Data Management System";


    constructor(private title: Title) {
    }


    // items
    get itemsTitle() {
        return this.title.setTitle("Items - " + this.appName);
    }

    set itemDetailsTitle(itemName: string) {
        if (!itemName) {
            this.title.setTitle("Item details - " + this.appName);
        } else {
            this.title.setTitle(itemName + " - Item details - " + this.appName);
        }
    }

    set editItemTitle(itemName: string) {
        if (!itemName) {
            this.title.setTitle("Edit item - " + this.appName);
        } else {
            this.title.setTitle(itemName + " - Edit item - " + this.appName);
        }
    }

    set deleteItemTitle(itemName: string) {
        if (!itemName) {
            this.title.setTitle("Delete item - " + this.appName);
        } else {
            this.title.setTitle(itemName + " - Delete item - " + this.appName);
        }
    }

    set createItemTitle(o: null) {
        this.title.setTitle("Create new item - " + this.appName);
    }


    // retailers
    get retailersTitle() {
        return this.title.setTitle("Retailers - " + this.appName);
    }

    set retailerDetailsTitle(retailerName: string) {
        if (!retailerName) {
            this.title.setTitle("Retailer details - " + this.appName);
        } else {
            this.title.setTitle(retailerName + " - Retailer details - " + this.appName);
        }
    }

    set editRetailerTitle(retailerName: string) {
        if (!retailerName) {
            this.title.setTitle("Edit retailer - " + this.appName);
        } else {
            this.title.setTitle(retailerName + " - Edit retailer - " + this.appName);
        }
    }

    set deleteRetailerTitle(retailerName: string) {
        if (!retailerName) {
            this.title.setTitle("Delete retailer - " + this.appName);
        } else {
            this.title.setTitle(retailerName + " - Delete retailer - " + this.appName);
        }
    }

    set createRetailerTitle(o: null) {
        this.title.setTitle("Create new retailer - " + this.appName);
    }


    // categories
    get categoriesTitle() {
        return this.title.setTitle("Categories - " + this.appName);
    }

    set createCategoryTitle(o: null) {
        this.title.setTitle("Create category - " + this.appName);
    }

    set editCategoryTitle(o: null) {
        this.title.setTitle("Edit category - " + this.appName);
    }

    set deleteCategoryTitle(categoryName: string) {
        if (!categoryName) {
            this.title.setTitle("Delete category - " + this.appName);
        } else {
            this.title.setTitle(categoryName + " - Delete category - " + this.appName);
        }
    }

    set categoryDetailsTitle(categoryName: string | null) {
        if (!categoryName) {
            this.title.setTitle("Category details - " + this.appName);
        } else {
            this.title.setTitle(categoryName + " - Category details - " + this.appName);
        }
    }
    

    // account
    set accountDetailsTitle(username: string) {
        if (!username) {
            this.title.setTitle("Account details - " + this.appName);
        } else {
            this.title.setTitle(username + " - Account details - " + this.appName);
        }
    }

    get loginTitle() {
        return this.title.setTitle("Login - " + this.appName);
    }

    get passwordChangeTitle() {
        return this.title.setTitle("Password change - " + this.appName);
    }


    // index
    get indexTitle() {
        return this.title.setTitle("Index page - " + this.appName);
    }


    // users
    get usersTitle(): void {
        return this.title.setTitle("Users - " + this.appName);
    }

    set editUserTitle(username: string | null) {
        if (!username) {
            this.title.setTitle("Edit user - " + this.appName);
        } else {
            this.title.setTitle(username + " - Edit user - " + this.appName);
        }
    }

    set deleteUserTitle(username: string | null) {
        if (!username) {
            this.title.setTitle("Delete user - " + this.appName);
        } else {
            this.title.setTitle(username + " - Delete user - " + this.appName);
        }
    }

    set userDetailsTitle(username: string | null) {
        if (!username) {
            this.title.setTitle("User details - " + this.appName);
        } else {
            this.title.setTitle(username + " - User details - " + this.appName);
        }
    }
}