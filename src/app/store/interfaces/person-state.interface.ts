// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';

export interface IPersonState {
    manifestId: number;
    persons: IPerson[];
    editedPerson: IPerson;
    personError: IManifestManagerError;
    loadingPersonList: boolean;
    loadingPerson: boolean;
}