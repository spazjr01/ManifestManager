// Angular libraries
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// Other libraries
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Manifest Manager classes and components
import * as SettingActions from '../actions/setting.actions';
import { ConnectionConstants } from '../../shared/constants/connection.constants';
import { ISetting } from '../../models/interfaces/setting.interface';
import { SettingActionFactory } from '../factories/setting-action.factory';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from '../../shared/enumerations/enumerations';

@Injectable()
export class SettingEffects {

    @Effect()
    getSettings = this._actions$.pipe(
            ofType(SettingActions.GET_SETTINGS),
            switchMap((getAction: SettingActions.GetSettings) => {
                const url =
                    // Note this webservice does not exist, yet.
                    `${ConnectionConstants.MM_WEB_SERVICE_URL}settings/getsettings/${getAction.payload}`;
                return this._httpClientService.get<{ [key: string]: ISetting }>(url)
                .pipe(
                    map(responseData => {
                        const settings = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                settings.push(responseData[key]);
                            }
                        }
                        return settings;
                    }),
                    map(settings => {
                        return SettingActionFactory.CreateSetSettings(settings);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_GET_SETTINGS + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(SettingActionFactory.CreateSettingError({
                            functionType: FunctionType.GetSettings,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    )

    @Effect()
    editSetting = this._actions$.pipe(
        ofType(SettingActions.EDIT_SETTING_START),
            switchMap((editAction: SettingActions.EditSettingStart) => {
                // Note this webservice does not exist, yet.
                const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}settings/updatesetting/`;
                let updatedSetting: ISetting = { ...editAction.payload };
                updatedSetting.UpdateDateTime = new Date().toISOString();
                return this._httpClientService.put<{ [name: string]: ISetting }>(url, updatedSetting)
                .pipe(
                    map(() => {
                        return SettingActionFactory.CreateSettingSuccess();
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_EDIT_SETTING + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(SettingActionFactory.CreateSettingError({
                            functionType: FunctionType.EditSetting,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    )
    
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _httpClientService: HttpClient
    ) { }
}