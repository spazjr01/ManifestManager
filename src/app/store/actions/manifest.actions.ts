// Other libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { IManifest } from '../../models/interfaces/manifest.interface';
import * as Actions from '../interfaces/action.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export const ADD_MANIFEST_START = '[Manifest Main] Add Manifest Start';
export const EDIT_MANIFEST_START = '[Manifest Main] Edit Manifest Start';
export const DELETE_MANIFEST_START = '[Manifest Main] Delete Manifest Start';

export const MANIFEST_SUCCESS = '[Manifest Main] Manifest Success';
export const MANIFEST_ERROR = '[Manifest Main] Manifest Error';

export const EDIT_MANIFEST_CLIENT_ONLY = '[Manifest Main] Edit Manifest Client Only';

export const START_EDIT = '[Manifest Main] Start Edit';
export const STOP_EDIT = '[Manifest Main] Stop Edit';

export const GET_MANIFESTS = '[Manifest Main] Get Manifests';
export const SET_MANIFESTS = '[Manifest Main] Set Manifests';

export class AddManifestStart implements Actions.IManifestAction {
    readonly type = ADD_MANIFEST_START;
    constructor(public payload: IManifest) { }
}

export class EditManifestStart implements Actions.IManifestAction {
    readonly type = EDIT_MANIFEST_START;
    constructor(public payload: IManifest) { }
}

export class DeleteManifestStart implements Actions.IManifestAction {
    readonly type = DELETE_MANIFEST_START;
    constructor(public payload: IManifest) { }
}

export class ManifestSuccess implements Action {
    readonly type = MANIFEST_SUCCESS;
}

export class ManifestError implements Actions.IErrorAction {
    readonly type = MANIFEST_ERROR;
    constructor(
        public payload: {
            functionType: FunctionType;
            errorMessage: string;
        }
    ) { }
}

export class EditManifestClientOnly implements Actions.IManifestAction {
    readonly type = EDIT_MANIFEST_CLIENT_ONLY;
    constructor(public payload: IManifest) { }
}

export class StartEdit implements Actions.IManifestAction {
    readonly type = START_EDIT;
    constructor(public payload: IManifest) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class GetManifests implements Actions.IManifestAction {
    readonly type = GET_MANIFESTS;
    constructor(public payload: string) { }
}

export class SetManifests implements Actions.IManifestAction {
    readonly type = SET_MANIFESTS;
    constructor(public payload: IManifest[]) { }
}

export type ManifestActions =
    AddManifestStart |
    EditManifestStart |
    DeleteManifestStart |
    ManifestSuccess |
    ManifestError |
    EditManifestClientOnly |
    StartEdit |
    StopEdit |
    GetManifests |
    SetManifests;
