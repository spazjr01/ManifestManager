// Angular libraries
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Other libraries
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'; 

// Ionic libraries
import { NavController } from '@ionic/angular';

// Manifest Manager classes and components
import * as ManifestActions from '../actions/manifest.actions';
import { IManifest } from '../../models/interfaces/manifest.interface';
import { ManifestActionFactory } from '../factories/manifest-action.factory';
import { ConnectionConstants } from '../../shared/constants/connection.constants';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from '../../shared/enumerations/enumerations';
import { IErrorAction } from '../interfaces/action.interface';

@Injectable()
export class ManifestEffects {

    @Effect()
    getManifests = this._actions$.pipe(
        ofType(ManifestActions.GET_MANIFESTS),
            switchMap((getAction: ManifestActions.GetManifests) => {
                const url =
                    `${ConnectionConstants.MM_WEB_SERVICE_URL}manifests/getmanifests/${getAction.payload}`;
                return this._httpClientService.get<{ [key: string]: IManifest }>(url)
                    .pipe(
                        map(responseData => {
                            const manifests = [];
                            for (const key in responseData) {
                                if (responseData.hasOwnProperty(key)) {
                                    manifests.push(responseData[key]);
                                }
                            }
                            return manifests;
                        }),
                    map(manifests => {
                        return ManifestActionFactory.CreateSetManifests(manifests);
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const errorMsg = ErrorConstants.ERROR_MESSAGE_GET_MANIFESTS + error.message;
                            // TODO: add code for logging error.  Console.log is just a temp fix.
                            console.log(errorMsg);
                            return of(ManifestActionFactory.CreateManifestError({
                                functionType: FunctionType.GetManifests,
                                errorMessage: errorMsg
                            }));
                        })
                    );
            })
    )

    @Effect()
    addManifest = this._actions$.pipe(
        ofType(ManifestActions.ADD_MANIFEST_START),
            switchMap((addAction: ManifestActions.AddManifestStart) => {
                const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}manifests/addmanifest/`;
                let newManifest: IManifest = { ...addAction.payload };
                newManifest.UpdateDateTime = new Date().toISOString();
                return this._httpClientService.post<{ [name: string]: IManifest }>(url, newManifest)
                    .pipe(
                    map(() => {
                        return ManifestActionFactory.CreateManifestSuccess();
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const errorMsg = ErrorConstants.ERROR_MESSAGE_ADD_MANIFEST + error.message;
                            // TODO: add code for logging error.  Console.log is just a temp fix.
                            console.log(errorMsg);
                            return of(ManifestActionFactory.CreateManifestError({
                                functionType: FunctionType.AddManifest,
                                errorMessage: errorMsg
                            }));
                        })
                    );
            })
    )

    @Effect()
    editManifest = this._actions$.pipe(
        ofType(ManifestActions.EDIT_MANIFEST_START),
        switchMap((editAction: ManifestActions.EditManifestStart) => {
            const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}manifests/updatemanifest/`;
            let updatedManifest: IManifest = { ...editAction.payload };
            updatedManifest.UpdateDateTime = new Date().toISOString();
            return this._httpClientService.put<{ [name: string]: IManifest }>(url, updatedManifest)
                .pipe(
                    map(() => {
                        return ManifestActionFactory.CreateManifestSuccess();
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_EDIT_MANIFEST + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(ManifestActionFactory.CreateManifestError({
                            functionType: FunctionType.EditManifest,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    )

    @Effect()
    deleteManifest = this._actions$.pipe(
            ofType(ManifestActions.DELETE_MANIFEST_START),
            switchMap((deleteAction: ManifestActions.DeleteManifestStart) => {
                const manifest = deleteAction.payload;
                const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}manifests/deletemanifest/${deleteAction.payload.ManifestId}`;
                return this._httpClientService.delete(url, { observe: 'response' })
                    .pipe(
                    map(() => {
                        return ManifestActionFactory.CreateGetManifests(manifest.ManifestUic);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_DELETE_MANIFEST + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(ManifestActionFactory.CreateManifestError({
                            functionType: FunctionType.DeleteManifest,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    )

    @Effect({ dispatch: false })
    manifestSuccess = this._actions$.pipe(
        ofType(ManifestActions.MANIFEST_SUCCESS),
        tap(() => {
            this._navController.navigateBack('/manifest');
        })
    );

    @Effect({ dispatch: false })
    getManifestsFailure = this._actions$.pipe(
        ofType(ManifestActions.MANIFEST_ERROR),
            tap((action: IErrorAction) => {
                if (action.payload.functionType === FunctionType.GetManifests) {
                    this._router.navigateByUrl('/auth');
                }
        })
    );

    constructor(
        private _router: Router,
        private _navController: NavController,
        private _actions$: Actions,
        private _httpClientService: HttpClient
    ) { }
}

