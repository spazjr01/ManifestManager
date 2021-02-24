// Other libraries
import { Action } from '@ngrx/store';

// Manifest Manager classes and components
import { IPersonAction, IErrorAction, IAddPersonAction } from '../interfaces/action.interface';
import * as PersonActions from '../actions/person.actions';
import { IPerson } from '../../models/interfaces/person.interface';
import { FunctionType } from '../../shared/enumerations/enumerations';
import { IStatus } from 'src/app/models/interfaces/status.interface';

export class PersonActionFactory {

    static CreateGetManifestDetails(payload: number): IPersonAction {
        return new PersonActions.GetManifestDetails(payload);
    }

    static CreateSetManifestDetails(payload: IPerson[]): IPersonAction {
        return new PersonActions.SetManifestDetails(payload);
    }

    static CreateAddPersonStart(payload: IPerson): IPersonAction {
        return new PersonActions.AddPersonStart(payload);
    }

    static CreateDeletePersonStart(payload: IPerson): IPersonAction {
        return new PersonActions.DeletePersonStart(payload);
    }

    static CreatePersonSuccess(): Action {
        return new PersonActions.PersonSuccess();
    }

    static CreatePersonError(payload: { functionType: FunctionType, errorMessage: string }): IErrorAction {
        return new PersonActions.PersonError(payload);
    }

    static CreateAddPersonSuccess(payload: {
        functionType: FunctionType, errorMessage: string, addStatus: IStatus
    }): IAddPersonAction {
        return new PersonActions.AddPersonSuccess(payload);
    }

    static CreateAddPersonError(payload: {
        functionType: FunctionType, errorMessage: string, addStatus: IStatus
    }): IAddPersonAction {
        return new PersonActions.AddPersonError(payload);
    }

    static CreateStartEdit(payload: IPerson): IPersonAction {
        return new PersonActions.StartEdit(payload);
    }

    static CreateStopEdit(): Action {
        return new PersonActions.StopEdit();
    }
}