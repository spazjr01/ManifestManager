// Angular libraries
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';

// Other libraries
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Manifest Manager classes and components
import * as AuthActions from '../actions/auth.actions';
import { IAuth } from '../../models/interfaces/auth.interface';
import { AuthActionFactory } from '../factories/auth-action.factory';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from 'src/app/shared/enumerations/enumerations';

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this._actions$.pipe(
        ofType(AuthActions.LOGIN_START),
            switchMap((authAction: AuthActions.LoginStart) => {
                // TODO: Add code to authenticate with server and return that result.
                // The following return statement is a placeholder to simulate
                // a "returned Observable<IAuth> object", which would result from the user's
                // userid and password being received and authenticated at the server.
                // Also, when this is implemented from the results of a http.post action,
                // the error logic will have to be handled in 'this' block of logic.  See
                // Udemy > Angular - The Complete Guide > Bonus: Working with NgRx in our
                // Project > Effects and Error Handling > @6:55 (in the video) for instructions
                // on implementing this correctly.
                let expirationDtm: Date = new Date();
                expirationDtm.setDate(expirationDtm.getDate() + 1);
                const placeHolder: IAuth = {
                    UserId: authAction.payload.userId,
                    Token: 'fakeToken',
                    ExpirationDtm: expirationDtm
                };

                return of(placeHolder)
                    .pipe(
                        map(authUser => {
                            return AuthActionFactory.CreateLogin({
                                userId: authUser.UserId,
                                token: authUser.Token,
                                expirationDtm: authUser.ExpirationDtm
                            });
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const errorMsg = ErrorConstants.ERROR_MESSAGE_LOG_IN + error.message;
                            // TODO: add code for logging error.  Console.log is just a temp fix.
                            console.log(errorMsg);    
                            return of(AuthActionFactory.CreateAuthError({
                                functionType: FunctionType.LogIn,
                                errorMessage: errorMsg
                            }));
                        }));
            })
    );

    //@Effect({ dispatch: false })
    //authSuccess = this._actions$.pipe(
    //    ofType(AuthActions.LOGIN),
    //        tap(() => {
    //            this._router.navigateByUrl('/auth-unit');
    //    })
    //);

    @Effect({ dispatch: false })
    authLogout = this._actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this._router.navigateByUrl('/auth');
        })
    );

    constructor(
        private _actions$: Actions,
        private _router: Router
    ) {

    }
}