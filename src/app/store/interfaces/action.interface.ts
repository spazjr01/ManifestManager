// Other libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { IManifest } from '../../models/interfaces/manifest.interface';
import { IPerson } from '../../models/interfaces/person.interface';
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { IAuth } from '../../models/interfaces/auth.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';
import { IStatus } from '../../models/interfaces/status.interface';
import { ISetting } from '../../models/interfaces/setting.interface';

export interface IAuthAction extends Action { payload: { userId: string; password: string }; }

export interface IAuthUserAction extends Action {
    payload: { userId: string; token: string; expirationDtm: Date };
}

export interface IErrorAction extends Action {
    payload: {
        functionType: FunctionType;
        errorMessage: string;
    }
}

export interface IAddPersonAction extends Action {
    payload: {
        functionType: FunctionType;
        errorMessage: string;
        addStatus: IStatus;
    }
}

export interface IAuthUnitAction extends Action { payload: IAuth | IAuthUnit[]; }

export interface IManifestAction extends Action {
    payload: IManifest | IManifest[] | number | string;
}

export interface IPersonAction extends Action {
    payload: IPerson | IPerson[] | IStatus | number;
}

export interface ISettingAction extends Action {
    payload: ISetting | ISetting[] | string;
}
