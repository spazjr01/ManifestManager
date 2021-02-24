// Manifest Manager classes and components
import { IAuthUnitAction, IErrorAction } from '../interfaces/action.interface';
import * as AuthUnitActions from '../actions/auth-unit.actions';
import { IAuth } from '../../models/interfaces/auth.interface';
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export class AuthUnitActionFactory {
    static CreateGetAuthUnits(payload: IAuth ): IAuthUnitAction {
        return new AuthUnitActions.GetAuthUnits(payload);
    }

    static CreateSetAuthUnits(payload: IAuthUnit[]): IAuthUnitAction {
        return new AuthUnitActions.SetAuthUnits(payload);
    }

    static CreateAuthUnitsError(payload: { functionType: FunctionType, errorMessage: string }): IErrorAction {
        return new AuthUnitActions.AuthUnitsError(payload);
    }
}
