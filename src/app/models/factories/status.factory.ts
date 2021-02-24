// Manifest Manager classes and components
import { IStatus } from '../interfaces/status.interface';
import { Status } from '../status.model';
import { ManifestFactory } from './manifest.factory';
import { PersonFactory } from './person.factory';
import { IManifest } from '../interfaces/manifest.interface';
import { IPerson } from '../interfaces/person.interface';

export class StatusFactory {

    static CreatingEmptyStatus(): IStatus {
        return new Status(
            false,
            '',
            ManifestFactory.CreateGenericManifest(),
            PersonFactory.CreateGenericPerson()
        );
    }

    static CreateStatus(success: boolean, message: string, manifest: IManifest, person: IPerson) {
        return new Status(success, message, manifest, person);
    }
}