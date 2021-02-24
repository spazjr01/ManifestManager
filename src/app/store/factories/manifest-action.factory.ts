// Other libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { IManifestAction, IErrorAction } from '../interfaces/action.interface';
import * as ManifestActions from '../actions/manifest.actions';
import { IManifest } from '../../models/interfaces/manifest.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';

export class ManifestActionFactory {

    static CreateGetManifests(payload: string): IManifestAction {
        return new ManifestActions.GetManifests(payload);
    }

    static CreateSetManifests(payload: IManifest[]): IManifestAction {
        return new ManifestActions.SetManifests(payload);
    }

    static CreateAddManifestStart(payload: IManifest): IManifestAction {
        return new ManifestActions.AddManifestStart(payload);
    }

    static CreateEditManifestStart(payload: IManifest): IManifestAction {
        return new ManifestActions.EditManifestStart(payload);
    }

    static CreateDeleteManifestStart(payload: IManifest): IManifestAction {
        return new ManifestActions.DeleteManifestStart(payload);
    }

    static CreateManifestSuccess(): Action {
        return new ManifestActions.ManifestSuccess();
    }

    static CreateManifestError(payload: { functionType: FunctionType, errorMessage: string }): IErrorAction {
        return new ManifestActions.ManifestError(payload);
    }

    static CreateEditManifestClientOnly(payload: IManifest): IManifestAction {
        return new ManifestActions.EditManifestClientOnly(payload);
    }

    static CreateStartEdit(payload: IManifest): IManifestAction {
        return new ManifestActions.StartEdit(payload);
    }

    static CreateStopEdit(): Action {
        return new ManifestActions.StopEdit();
    }
}