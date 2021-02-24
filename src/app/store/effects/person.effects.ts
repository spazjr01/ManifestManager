// Angular libraries
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Other libraries
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Manifest Manager classes and components
import * as PersonActions from '../actions/person.actions';
import { IPerson } from '../../models/interfaces/person.interface';
import { PersonActionFactory } from '../factories/person-action.factory';
import { ConnectionConstants } from '../../shared/constants/connection.constants';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { FunctionType } from '../../shared/enumerations/enumerations';
import { IErrorAction } from '../interfaces/action.interface';
import { IStatus } from '../../models/interfaces/status.interface';
import { StatusFactory } from '../../models/factories/status.factory';
import { IManifest } from 'src/app/models/interfaces/manifest.interface';

@Injectable()
export class PersonEffects {

    @Effect()
    getManifestDetails = this._actions$.pipe(
        ofType(PersonActions.GET_MANIFEST_DETAILS),
        switchMap((getAction: PersonActions.GetManifestDetails) => {
            const url =
                `${ConnectionConstants.MM_WEB_SERVICE_URL}manifestdetails/getmanifestdetails/${getAction.payload}`;
            return this._httpClientService.get<{ [key: string]: IPerson }>(url)
                .pipe(
                    map(responseData => {
                        const personList = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty(key)) {
                                personList.push(responseData[key]);
                            }
                        }
                        return personList;
                    }),
                    map(manifestDetails => {
                        return PersonActionFactory.CreateSetManifestDetails(manifestDetails);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_GET_MANIFEST_DETAILS + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(PersonActionFactory.CreatePersonError({
                            functionType: FunctionType.GetManifestDetails,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    );

    @Effect()
    addPerson = this._actions$.pipe(
        ofType(PersonActions.ADD_PERSON_START),
        switchMap((addAction: PersonActions.AddPersonStart) => {
            const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}manifestdetails/addperson/`;
            let newPerson: IPerson = { ...addAction.payload };
            newPerson.UpdateDateTime = new Date().toISOString();
            return this._httpClientService.post<{ [name: string]: IStatus }>(url, newPerson)
                .pipe(
                    map(response => {
                        // Richard: There has got to be a better way to do this.
                        let temp = response['Success'] as unknown;
                        const success: boolean = temp as boolean;
                        temp = response['Message'] as unknown;
                        const message: string = temp as string;
                        temp = response['Manifest'] as unknown;
                        const manifest: IManifest = temp as IManifest;
                        temp = response['Person'] as unknown;
                        const person: IPerson = temp as IPerson;
                        const addPersonStatus: IStatus = StatusFactory.CreateStatus(
                            success, message, manifest, person
                        );

                        return PersonActionFactory.CreateAddPersonSuccess({
                            functionType: FunctionType.AddPerson,
                            errorMessage: null,
                            addStatus: addPersonStatus
                        });
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        let addPersonStatus: IStatus = StatusFactory.CreatingEmptyStatus();
                        let errorMsg: string = ErrorConstants.ERROR_MESSAGE_ADD_PERSON;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        // TODO:
                        // Note from Richard: if the HttpErrorResponse was generated explicitly
                        // by our code, errorResponse.error is will be of type IStatus.  So, it will have a Message
                        // property.  There is probably a better way to do this using typeOf or some 
                        // similar check, but I couldn't get any of that to work properly (I was probably
                        // using the wrong syntax).  So, I implemented like below, so that I could 
                        // keep moving.  Maybe someone can cleanup later.
                        // If the HttpErrorResponse is not generated explicitly by our code, then I
                        // coded to use the generic errorResponse.message, which works just fine for 
                        // that scenario.
                        if (errorResponse.error.Message) {
                            addPersonStatus = errorResponse.error;
                            errorMsg = addPersonStatus.Message;
                        }
                        else {
                            errorMsg += errorResponse.message;
                        }

                        return of(PersonActionFactory.CreateAddPersonError({
                            functionType: FunctionType.AddPerson,
                            errorMessage: errorMsg,
                            addStatus: addPersonStatus
                        })
                        );
                    })
                );
        })
    );

    @Effect()
    deletePerson = this._actions$.pipe(
        ofType(PersonActions.DELETE_PERSON_START),
        switchMap((deleteAction: PersonActions.DeletePersonStart) => {
            const person = deleteAction.payload;
            const url = `${ConnectionConstants.MM_WEB_SERVICE_URL}manifestdetails/deleteperson/${deleteAction.payload.ManifestID}/${deleteAction.payload.PersonID}`;
            return this._httpClientService.delete(url, { observe: 'response' })
                .pipe(
                    map(() => {
                        return PersonActionFactory.CreateGetManifestDetails(person.ManifestID);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const errorMsg = ErrorConstants.ERROR_MESSAGE_DELETE_PERSON + error.message;
                        // TODO: add code for logging error.  Console.log is just a temp fix.
                        console.log(errorMsg);
                        return of(PersonActionFactory.CreatePersonError({
                            functionType: FunctionType.DeletePerson,
                            errorMessage: errorMsg
                        }));
                    })
                );
        })
    );

    @Effect({ dispatch: false })
    getManifestDetailsFailure = this._actions$.pipe(
        ofType(PersonActions.PERSON_ERROR),
            tap((action: IErrorAction) => {
                if (action.payload.functionType === FunctionType.GetManifestDetails) {
                this._router.navigateByUrl('/auth');
            }
        })
    );

    constructor(
        private _router: Router,
        private _actions$: Actions,
        private _httpClientService: HttpClient
    ) { }
}


