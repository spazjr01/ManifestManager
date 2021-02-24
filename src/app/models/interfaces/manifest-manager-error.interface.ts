// Manifest Manager classes and components
import { ErrorType } from '../../shared/enumerations/enumerations';
import { IStatus } from './status.interface';

export interface IManifestManagerError extends IStatus {
    ErrorTitle: string;
    ErrorMessage: string;
    ErrorType: ErrorType;
}