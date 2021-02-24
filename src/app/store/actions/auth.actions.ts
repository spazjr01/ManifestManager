// Angular libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import * as Actions from '../interfaces/action.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] Login';
export const AUTH_ERROR = '[Auth] Auth Error';
export const LOGOUT_START = '[Auth] Logout Start';
export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Actions.IAuthAction {
    readonly type = LOGIN_START;

    constructor(
        public payload: {
            userId: string;
            password: string;
        }
    ) { }
}

export class Login implements Actions.IAuthUserAction {
    readonly type = LOGIN;

    constructor(
        public payload: {
            userId: string;
            token: string;
            expirationDtm: Date;
        }
    ) { }
}

export class AuthError implements Actions.IErrorAction {
    readonly type = AUTH_ERROR;

    constructor(
        public payload: {
            functionType: FunctionType,
            errorMessage: string
        }
    ) { }
}

export class LogoutStart implements Action {
    readonly type = LOGOUT_START;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout | LoginStart | LogoutStart | AuthError;


