// Other libraries

// Manifest Manager classes and components
import { IAuthState } from '../interfaces/auth-state.interface';
import { AuthFactory } from '../../models/factories/auth.factory';
import * as AuthActions from '../actions/auth.actions';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';

const initialState: IAuthState = {
    user: null,
    authError: ManifestManagerErrorFactory.CreateNoError(),
    loading: false
};

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = AuthFactory.CreateAuth();
            user.UserId = action.payload.userId;
            user.Token = action.payload.token;
            user.ExpirationDtm = action.payload.expirationDtm;
            return {
                ...state,
                user: user,
                authError: ManifestManagerErrorFactory.CreateNoError(),
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: ManifestManagerErrorFactory.CreateNoError(),
                loading: true
            };
        case AuthActions.AUTH_ERROR:
            return {
                ...state,
                user: null,
                authError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage
                    ),
                loading: false
            };
        default:
            return state;
    }
    
}