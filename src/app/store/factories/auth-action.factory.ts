// Angular libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { IAuthUserAction, IAuthAction, IErrorAction } from '../interfaces/action.interface';
import * as AuthActions from '../actions/auth.actions';
import { FunctionType } from '../../shared/enumerations/enumerations';

export class AuthActionFactory {
    static CreateLogin(payload: {
        userId: string;
        token: string;
        expirationDtm: Date;
    }): IAuthUserAction {
        return new AuthActions.Login(payload);
    }

    static CreateLoginStart(payload: {
        userId: string;
        password: string;
    }): IAuthAction {
        return new AuthActions.LoginStart(payload);
    }

    static CreateLogoutStart(): Action {
        return new AuthActions.LogoutStart();
    }

    static CreateLogout(): Action {
        return new AuthActions.Logout();
    }

    static CreateAuthError(payload: { functionType: FunctionType, errorMessage: string }): IErrorAction {
        return new AuthActions.AuthError(payload);
    }
}