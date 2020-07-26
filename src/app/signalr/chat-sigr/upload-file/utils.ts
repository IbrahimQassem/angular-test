import {Subject, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
 
export enum KEY_CODE {
    ENTER = 13,
    RIGHT_ARROW = 39,
    LEFT_ARROW = 37
}

@Injectable({
    providedIn: 'root'
})
export default class Utils {
    error: Subject<string> = new Subject<string>();
    Role:any;
    constructor(private router: Router) {}

    handleError(service: string, error: Response | any, customMessage?: string) {
        const err = service + '::handleError' + '=  ' + error;
        this.error.next(customMessage);
        return throwError(error);
    }

    encodeBase64(value: any) {
        return btoa(JSON.stringify(value));
    }

    decodeBase64(value: any) {
        return atob(value);
    }

    navigateToDefaultPage(usersRole: any) {
        if (usersRole === this.Role.Employee) {
            this.router.navigate(['/dashboardNavigation', {outlets: {dashNav: ['productionDashboard']}}]);
        } else if (usersRole === this.Role.Client) {
            this.router.navigate(['/clientDashboard']);
        } else if (usersRole === this.Role.OfficeAdmin) {
            this.router.navigate(['/dashboardNavigation', {outlets: {dashNav: ['enterpriseDashboard']}}]);
        } else {
            this.router.navigate(['/auth']);
        }
    }

    validateEmail(inputText: string) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailFormat)) {
            return true;
        } else {
            return false;
        }
    }
}