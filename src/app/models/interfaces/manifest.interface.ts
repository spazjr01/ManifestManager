// Manifest Manager classes and components
import { IPerson } from './person.interface';

export interface IManifest {
    ManifestId: number;
    ManifestUic: string;
    ManifestName: string;
    ManifestDateTime: string;
    UserId: string;
    SentToApodDateTime: string;
    PersCountAddedToApod: number;
    SentToUnitDateTime: string;
    PersCountAddedToUnit: number;
    ManifestTypeCode: string;
    UpdateDateTime: string;
    ShowDetails: boolean;
    ManifestedPersonnel: IPerson[];
}