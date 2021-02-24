// Manifest Manager classes and components
import { IManifest } from './interfaces/manifest.interface';
import { IPerson } from './interfaces/person.interface';
  
export class Manifest implements IManifest {

    ManifestId: number;
    ManifestUic: string;
    ManifestName: string;
    ManifestDateTime: string;
    ManifestTypeCode: string;
    UserId: string;
    SentToApodDateTime: string;
    PersCountAddedToApod: number;
    SentToUnitDateTime: string;
    PersCountAddedToUnit: number;
    UpdateDateTime: string;
    ShowDetails: boolean;
    ManifestedPersonnel: IPerson[];

    constructor() {
        this.ManifestId = -1;
        this.ManifestUic = '';
        this.ManifestName = '';
        this.ManifestDateTime = '';
        this.ManifestTypeCode = '';
        this.SentToApodDateTime = '';
        this.PersCountAddedToApod = 0;
        this.SentToUnitDateTime = '';
        this.PersCountAddedToUnit = 0;
        this.UserId = '';
        this.UpdateDateTime = '';
        this.ShowDetails = false;
        this.ManifestedPersonnel = [];
    }
}
