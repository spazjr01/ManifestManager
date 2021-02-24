// Other libraries
import { Action } from '@ngrx/store';

// ManifestManager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import * as Actions from '../interfaces/action.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';
import { IStatus } from '../../models/interfaces/status.interface';

export const ADD_PERSON_START = '[Manifest Details] Add Person Start';
export const DELETE_PERSON_START = '[Manifest Details] Delete Person Start';

export const PERSON_SUCCESS = '[Manifest Details] Person Success';
export const PERSON_ERROR = '[Manifest Details] Person Error';
export const ADD_PERSON_SUCCESS = '[Manifest Details] Add Person Success';
export const ADD_PERSON_ERROR = '[Manifest Details] Add Person Error';

export const START_EDIT = '[Manifest Details] Start Edit';
export const STOP_EDIT = '[Manifest Details] Stop Edit';

export const GET_MANIFEST_DETAILS = '[Manifest Details] Get Manifest Details';
export const SET_MANIFEST_DETAILS = '[Manifest Details] Set Manifest Details';

export class AddPersonStart implements Actions.IPersonAction {
    readonly type = ADD_PERSON_START;
    constructor(public payload: IPerson) { }
}

export class DeletePersonStart implements Actions.IPersonAction {
    readonly type = DELETE_PERSON_START;
    constructor(public payload: IPerson) { }
}

export class PersonSuccess implements Action {
    readonly type = PERSON_SUCCESS;
}

export class AddPersonSuccess implements Actions.IAddPersonAction {
    readonly type = ADD_PERSON_SUCCESS;
    constructor(
        public payload: {
            functionType: FunctionType;
            errorMessage: string;
            addStatus: IStatus;
        }
    ) { }
}

export class AddPersonError implements Actions.IAddPersonAction {
    readonly type = ADD_PERSON_ERROR;
    constructor(
        public payload: {
            functionType: FunctionType;
            errorMessage: string;
            addStatus: IStatus;
        }
    ) { }
}

export class PersonError implements Actions.IErrorAction {
    readonly type = PERSON_ERROR;
    constructor(
        public payload: {
            functionType: FunctionType;
            errorMessage: string;
        }
    ) { }
}

export class StartEdit implements Actions.IPersonAction {
    readonly type = START_EDIT;
    constructor(public payload: IPerson) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class GetManifestDetails implements Actions.IPersonAction {
    readonly type = GET_MANIFEST_DETAILS;
    constructor(public payload: number) { }
}

export class SetManifestDetails implements Actions.IPersonAction {
    readonly type = SET_MANIFEST_DETAILS;
    constructor(public payload: IPerson[]) { }
}

export type PersonActions =
    AddPersonStart |
    DeletePersonStart |
    PersonSuccess |
    PersonError |
    AddPersonSuccess |
    AddPersonError |
    StartEdit |
    StopEdit |
    GetManifestDetails |
    SetManifestDetails;