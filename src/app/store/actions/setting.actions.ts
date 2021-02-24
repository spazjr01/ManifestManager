// Angular libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { ISetting } from '../../models/interfaces/setting.interface';
import * as Actions from '../interfaces/action.interface';
import { FunctionType } from '../../shared/enumerations/enumerations'

export const EDIT_SETTING_START = '[Setting] Edit Setting Start';

export const SETTING_SUCCESS = '[Setting] Setting Success';
export const SETTING_ERROR = '[Setting] Setting Error';

export const EDIT_SETTING_CLIENT_ONLY = '[Seting] Edit Setting Client Only';

export const START_EDIT = '[Setting] Start Edit';
export const STOP_EDIT = '[Setting] Stop Edit';

export const GET_SETTINGS = '[Setting] Get Settings'
export const SET_SETTINGS = '[Setting] Set Settings'

export class EditSettingStart implements Actions.ISettingAction {
    readonly type = EDIT_SETTING_START;
    constructor(public payload: ISetting) { }
}

export class SettingSuccess implements Action {
    readonly type = SETTING_SUCCESS;
}

export class SettingError implements Actions.IErrorAction {
    readonly type = SETTING_ERROR;
    constructor(
        public payload: {
            functionType: FunctionType;
            errorMessage: string;
        }
    ) { }
}

export class EditSettingClientOnly implements Actions.ISettingAction {
    readonly type = EDIT_SETTING_CLIENT_ONLY;
    constructor(public payload: ISetting) { }
}

export class StartEdit implements Actions.ISettingAction {
    readonly type = START_EDIT;
    constructor(public payload: ISetting) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class GetSettings implements Actions.ISettingAction {
    readonly type = GET_SETTINGS;
    constructor(public payload: string) {}
}

export class SetSettings implements Actions.ISettingAction {
    readonly type = SET_SETTINGS;
    constructor(public payload: ISetting[]) { }
}

export type SettingActions =
    EditSettingStart |
    SettingSuccess |
    SettingError |
    EditSettingClientOnly |
    StartEdit |
    StopEdit |
    GetSettings |
    SetSettings;