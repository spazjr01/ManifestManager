// Manifest Manager classes and components
import { IManifestManagerError } from './interfaces/manifest-manager-error.interface';
import { ErrorType } from '../shared/enumerations/enumerations';
import { IStatus } from './interfaces/status.interface';
import { IManifest } from './interfaces/manifest.interface';
import { IPerson } from './interfaces/person.interface';

export class ManifestManagerError implements IManifestManagerError {
    ErrorTitle: string;
    ErrorMessage: string;
    ErrorType: ErrorType;
    Message: string;
    Success: boolean;
    Manifest: IManifest;
    Person: IPerson;

    constructor(title: string, message: string, type: ErrorType,
        status: IStatus = null
    ) {
        this.ErrorTitle = title;
        this.ErrorMessage = message;
        this.ErrorType = type;
        if (status) {
            this.Message = status.Message;
            this.Success = status.Success;
            this.Manifest = { ...status.Manifest };
            this.Person = { ...status.Person };
        } else {
            this.Message = null;
            this.Success = false;
            this.Manifest = null;
            this.Person = null;
        }
    }
}