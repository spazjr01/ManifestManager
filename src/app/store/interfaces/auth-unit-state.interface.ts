// Manifest Manager classes and components
import { IAuthUnit } from '../../models/interfaces/auth-unit.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';

export interface IAuthUnitState {
    authUnits: IAuthUnit[];
    authUnitError: IManifestManagerError;
    loading: boolean;
}