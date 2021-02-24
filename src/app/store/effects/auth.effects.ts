// Angular libraries
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';

// Ionic libraries
import { Storage } from '@ionic/storage';

// Other libraries
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Manifest Manager classes and components
import * as AuthActions from '../actions/auth.actions';
import { IAuth } from '../../models/interfaces/auth.interface';
import { AuthActionFactory } from '../factories/auth-action.factory';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from 'src/app/shared/enumerations/enumerations';

const TOKEN_KEY: string = '';

// TODO (possible): Check Token when app is minimized and started (or becomes not the active app, etc.).
// Implement a checktoken action.  I'm not sure that this is necessary with the auth guard that I have 
// in place on each page.But, if we run into a similar 
// type of problem, watch video @10:15 mark of https://www.youtube.com/watch?v=z3pDqnuyzZ4 to see
// how to possible do this.
@Injectable()
export class AuthEffects {
    @Effect()
    authLoginStart = this._actions$.pipe(
        ofType(AuthActions.LOGIN_START),
            switchMap((authAction: AuthActions.LoginStart) => {
                // TODO: Add code to authenticate with server and return that result.
                // The following return statement is a placeholder to simulate
                // a "returned Observable<IAuth> object", which would result from the user's
                // *userid and password being received and authenticated at the server.
                // *will be replaced with PIV("Personal Identity Verification")-Auth ("Authentication") Certificate
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
                            this._storage.set(TOKEN_KEY, authUser.Token);
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

    @Effect()
    authLogoutStart = this._actions$.pipe(
        ofType(AuthActions.LOGOUT_START),
        switchMap((authAction: AuthActions.LogoutStart) => {
            let token = this._storage.get(TOKEN_KEY);

            // TODO: Add code to logout with server and return that result.
            // The following return statement is a placeholder to simulate
            // a "returned Observable<> object", which would result from the user's
            // token being received and terminated at the server.
            // Also, when this is implemented from the results of a http.post action,
            // the error logic will have to be handled in 'this' block of logic.  See
            // Udemy > Angular - The Complete Guide > Bonus: Working with NgRx in our
            // Project > Effects and Error Handling > @6:55 (in the video) for instructions
            // on implementing this correctly.

            
            return of(token)
                .pipe(
                map((token) => {
                    console.log('Token', token);
                    this._storage.remove(TOKEN_KEY);
                        return AuthActionFactory.CreateLogout();
                    }),
                catchError((error: HttpErrorResponse) => {
                    const errorMsg = ErrorConstants.ERROR_MESSAGE_LOG_OUT + error.message;
                    // TODO: add code for logging error.  Console.log is just a temp fix.
                    console.log(errorMsg);
                    return of(AuthActionFactory.CreateAuthError({
                        functionType: FunctionType.LogOut,
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
        private _router: Router,
        private _storage: Storage
    ) {

    }
}