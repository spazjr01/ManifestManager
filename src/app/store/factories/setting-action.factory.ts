// Angular libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { ISetting } from '../../models/interfaces/setting.interface';
import * as SettingActions from '../actions/setting.actions';
import { ISettingAction, IErrorAction } from '../interfaces/action.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export class SettingActionFactory {

    static CreateGetSettings(payload: string): ISettingAction {
        return new SettingActions.GetSettings(payload);
    }

    static CreateSetSettings(payload: ISetting[]): ISettingAction {
        return new SettingActions.SetSettings(payload);
    }

    static CreateEditSettingStart(payload: ISetting): ISettingAction {
        return new SettingActions.EditSettingStart(payload);
    }

    static CreateStartEdit(payload: ISetting): ISettingAction {
        return new SettingActions.StartEdit(payload);
    }

    static CreateStopEdit(): Action {
        return new SettingActions.StopEdit();
    }

    static CreateEditSettingClientOnly(payload: ISetting): ISettingAction {
        return new SettingActions.EditSettingClientOnly(payload);
    }

    static CreateSettingSuccess(): Action {
        return new SettingActions.SettingSuccess();
    }

    static CreateSettingError(payload: { functionType: FunctionType, errorMessage: string }): IErrorAction {
        return new SettingActions.SettingError(payload);
    }
}