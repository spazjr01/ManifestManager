// Manifest Manager classes and components
import * as Actions from '../interfaces/action.interface';
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { IAuth } from '../../models/interfaces/auth.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export const SET_AUTH_UNITS = '[AuthUnit] Set Authorized Units';
export const GET_AUTH_UNITS = '[AuthUnit] Get Authorized Units';
export const AUTH_UNITS_ERROR = '[AuthUnit] Authorized Units Error';

export class SetAuthUnits implements Actions.IAuthUnitAction {
    readonly type = SET_AUTH_UNITS;

    constructor(public payload: IAuthUnit[]) {}
}

export class GetAuthUnits implements Actions.IAuthUnitAction {
    readonly type = GET_AUTH_UNITS;

    constructor(public payload: IAuth) {}
}

export class AuthUnitsError implements Actions.IErrorAction {
    readonly type = AUTH_UNITS_ERROR;

    constructor(
        public payload: {
            functionType: FunctionType,
            errorMessage: string
        }
    ) { }
}

export type AuthUnitActions = SetAuthUnits | GetAuthUnits | AuthUnitsError;