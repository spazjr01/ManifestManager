// Angular libraries
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Other libraries
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Manifest Manager classes and components
import * as AuthUnitActions from '../actions/auth-unit.actions';
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { AuthUnitActionFactory } from '../factories/auth-unit-action.factory';
import { ConnectionConstants } from '../../shared/constants/connection.constants';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from '../../shared/enumerations/enumerations';


@Injectable()
export class AuthUnitEffects {
    @Effect()
    getAuthUnits = this._actions$.pipe(
        ofType(AuthUnitActions.GET_AUTH_UNITS),
            switchMap((getAction: AuthUnitActions.GetAuthUnits) => {
                const httpHeaders: HttpHeaders = new HttpHeaders({
                    Authorization: 'Bearer JWT-token',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
            return this._httpClientService.post<{ [key: string]: IAuthUnit }>(
                `${ConnectionConstants.MM_WEB_SERVICE_URL}units/getauthorizedunits`,
                getAction.payload
                //,
                //{ 'headers': httpHeaders }
                )
                .pipe(
                    map(responseData => {
                        const authUnits = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                authUnits.push(responseData[key]);
                            }
                        }
                        return authUnits;
                    }),
                    map(authUnits => {
                        return AuthUnitActionFactory.CreateSetAuthUnits(authUnits);
                    }),
                catchError((error: HttpErrorResponse) => {
                    const errorMsg = ErrorConstants.ERROR_MESSAGE_GET_AUTH_UNITS + error.message;
                    // TODO: add code for logging error.  Console.log is just a temp fix.
                    console.log(error.message);
                    return of(AuthUnitActionFactory.CreateAuthUnitsError({
                        functionType: FunctionType.GetAuthUnits,
                        errorMessage: errorMsg
                    }));
                })
            );
        })
    )

    @Effect({ dispatch: false })
    getAuthUnitsFailure = this._actions$.pipe(
        ofType(AuthUnitActions.AUTH_UNITS_ERROR),
        tap(() => {
            this._router.navigateByUrl('/auth');
        })
    );


    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _httpClientService: HttpClient
    ) { }
}