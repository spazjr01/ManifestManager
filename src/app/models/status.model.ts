// Manifest Manager classes and components
import { IStatus } from './interfaces/status.interface';
import { IManifest } from './interfaces/manifest.interface';
import { IPerson } from './interfaces/person.interface';

export class Status implements IStatus {
    Success: boolean;
    Message: string;
    Manifest: IManifest;
    Person: IPerson;


    constructor(success: boolean, message: string, manifest: IManifest, person: IPerson) {
        this.Success = success;
        if (message) {
            this.Message = message;
        }
        if (manifest) {
            this.Manifest = manifest;
        }
        if (person) {
            this.Person = person;
        }
    }
}