// Manifest Manager classes and components
import { AuthUnitFactory } from '../../models/factories/auth-unit.factory';
import * as AuthUnitActions from '../actions/auth-unit.actions';
import { IAuthUnitState } from '../interfaces/auth-unit-state.interface';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';

const initialState: IAuthUnitState = {
    authUnits: AuthUnitFactory.CreateEmptyAuthUnitsList(),
    authUnitError: ManifestManagerErrorFactory.CreateNoError(),
    loading: false
};

export function authUnitReducer(
    state: IAuthUnitState = initialState,
    action: AuthUnitActions.AuthUnitActions) {

    switch (action.type) {
        case AuthUnitActions.SET_AUTH_UNITS:
            return {
                ...state,
                authUnits: [...action.payload],
                authUnitError: ManifestManagerErrorFactory.CreateNoError(),
                loading: false
            };
        case AuthUnitActions.GET_AUTH_UNITS:
            return {
                ...state,
                authUnitError: ManifestManagerErrorFactory.CreateNoError(),
                loading: true
            };
        case AuthUnitActions.AUTH_UNITS_ERROR:
            return {
                ...state,
                authUnitError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage
                    ),
                loading: false
            }
        default:
            return state;
    }
    return state;
}