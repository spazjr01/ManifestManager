// Manifest Manager classes and components
import { ManifestManagerError } from '../manifest-manager-error.model';
import { IManifestManagerError } from '../interfaces/manifest-manager-error.interface';
import { ErrorConstants } from '../../shared/constants/error.constants';
import { ErrorType, FunctionType } from 'src/app/shared/enumerations/enumerations';
import { IStatus } from '../interfaces/status.interface';

export class ManifestManagerErrorFactory {

    static CreateManifestManagerError(changeType: FunctionType, errorMessage: string, status: IStatus = null): IManifestManagerError {
        switch (changeType) {
            case FunctionType.LogIn:
                return this.CreateLoginError(errorMessage);
            case FunctionType.LogOut:
                {
                    // TODO: complete code
                }
            case FunctionType.GetAuthUnits:
                return this.CreateGetAuthUnitsError(errorMessage);
            case FunctionType.GetManifests:
                return this.CreateGetManifestsError(errorMessage);
            case FunctionType.AddManifest:
                return this.CreateAddManifestError(errorMessage);
            case FunctionType.EditManifest:
                return this.CreateEditManifestError(errorMessage);
            case FunctionType.DeleteManifest:
                return this.CreateDeleteManifestError(errorMessage);
            case FunctionType.GetManifestDetails:
                return this.CreateGetManifestDetailsError(errorMessage);
            case FunctionType.AddPerson:
                if (status.Success) {
                    return this.CreateNoErrorForAddPerson(errorMessage, status);
                } else {
                    return this.CreateAddPersonError(errorMessage, status);
                }
                return this.CreateAddPersonError(errorMessage, status);
            case FunctionType.DeletePerson:
                return this.CreateDeletePersonError(errorMessage);
            case FunctionType.ViewPerson:
                return this.CreateViewPersonError(errorMessage);
            case FunctionType.GetSettings:
                return this.CreateGetSettingsError(errorMessage);
            case FunctionType.EditSetting:
                return this.CreateEditSettingError(errorMessage);
            case FunctionType.ScanningBrowser:
                return this.CreateBrowserError(errorMessage);
            case FunctionType.ScanningCamera:
                return this.CreateCameraError(errorMessage);
            default:
                return this.CreateNoError();
        }
    }

    // TODO: possibly move the below functions to a separate class with non static functions.
    static CreateLoginError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_LOG_IN,
            error,
            ErrorType.LogInError
        );
    }

    static CreateGetAuthUnitsError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_GET_AUTH_UNITS,
            error,
            ErrorType.GetAuthUnitsError
        );
    }

    static CreateGetManifestsError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_GET_MANIFESTS,
            error,
            ErrorType.GetManifestsError
        );
    }

    static CreateAddManifestError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_ADD_MANIFEST,
            error,
            ErrorType.AddManifestError
        );
    }

    static CreateEditManifestError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_EDIT_MANIFEST,
            error,
            ErrorType.EditManifestError
        );
    }

    static CreateDeleteManifestError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_DELETE_MANIFEST,
            error,
            ErrorType.DeleteManifestError
        );
    }

    static CreateGetManifestDetailsError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_GET_MANIFEST_DETAILS,
            error,
            ErrorType.GetManifestDetailsError
        );
    }

    static CreateAddPersonError(error: string, addStatus: IStatus): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_ADD_PERSON,
            error,
            ErrorType.AddPersonError,
            addStatus
        );
    }

    static CreateDeletePersonError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_DELETE_PERSON,
            error,
            ErrorType.DeletePersonError
        );
    }

    static CreateViewPersonError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_GET_PERSON,
            error,
            ErrorType.ViewPersonError
        );
    }

    static CreateGetSettingsError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_GET_SETTINGS,
            error,
            ErrorType.GetSettingsError
        );
    }

    static CreateEditSettingError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_EDIT_SETTING,
            error,
            ErrorType.EditSettingError
        )
    }

    static CreateBrowserError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_BROWSER,
            error,
            ErrorType.ScanningBrowserError
        )
    }

    static CreateCameraError(error: string): IManifestManagerError {
        return new ManifestManagerError(
            ErrorConstants.ERROR_TITLE_CAMERA,
            error,
            ErrorType.ScanningCameraError
        )
    }

    static CreateNoError(): IManifestManagerError {
        return new ManifestManagerError(
            null,
            null,
            ErrorType.NoError
        );
    }

    static CreateNoErrorForAddPerson(error: string, addStatus: IStatus): IManifestManagerError {
        return new ManifestManagerError(
            null,
            null,
            ErrorType.NoError,
            addStatus
        );
    }

}