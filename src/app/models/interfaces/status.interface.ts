// Manifest Manager classes and components
import { IPerson } from './person.interface';
import { IManifest } from './manifest.interface';

export interface IStatus {
    Message: string;
    Success: boolean;
    Manifest: IManifest;
    Person: IPerson;
}