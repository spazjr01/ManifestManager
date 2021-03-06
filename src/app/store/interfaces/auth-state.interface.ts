// Manifest Manager classes and components
import { IAuth } from '../../models/interfaces/auth.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';

export interface IAuthState {
    user: IAuth;
    authError: IManifestManagerError;
    loading: boolean;
}