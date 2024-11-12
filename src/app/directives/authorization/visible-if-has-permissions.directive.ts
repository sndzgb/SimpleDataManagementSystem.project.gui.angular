import { Directive, Inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { AppPermissions } from "src/app/constants/app-permissions.enum";

export interface PermissionsValues {
    operator?: string;
    permissions: AppPermissions[] | undefined;
    values: string[] | undefined;
}
@Directive({
    selector: '[ngVisibleIfHasPermissions]' 
})
export class VisibleIfHasPermissionsDirective implements OnInit, OnChanges {
    
    permissions: AppPermissions[] | undefined;
    values: string | undefined;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {

    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }
    
    @Input() set ngVisibleIfHasPermissions(pv: PermissionsValues) {
        let breakLoop: boolean = false;
        let pristine: boolean = true;

        for (let index = 0; index < pv.permissions!.length; index++) {

            let value = pv.values![index];
            let permission: AppPermissions = pv.permissions![index];
            switch (permission) {
                case AppPermissions.IsAuthenticated:
                    if (value.toLowerCase() != "true") {
                        pristine = false;
                    }
                break;
                case AppPermissions.IsAnonymous:
                    if (value.toLowerCase() != "true") {
                        pristine = false;
                    }
                break;
                case AppPermissions.HasRoleAdmin:
                    if (value.toLowerCase() != 'true') {
                        pristine = false;
                    }
                break;
                case AppPermissions.IsResourceOwner:
                    if (value.toLowerCase() != 'true') {
                        pristine = false;
                    }
                break;
                case AppPermissions.IsInRole:
                    if (value.toLowerCase() != 'true') {
                        pristine = false;
                    }
                break;
                case AppPermissions.Custom:
                    if (value.toLowerCase() != 'true') {
                        pristine = false;
                    }
                break;
            }

            if (breakLoop) {
                break;
            }
        }
        
        if (pristine) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
