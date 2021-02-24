// Other libraries
import { BehaviorSubject } from 'rxjs';

// Manifest Manager classes and components
import { Manifest } from '../manifest.model';
import { IManifest } from '../interfaces/manifest.interface';


export class ManifestFactory {

    static CreateGenericManifest(): IManifest {
        let manifest: IManifest = new Manifest();
        manifest.ManifestDateTime = new Date().toISOString();
        return manifest;
    }

    static CreateManifest(manifestUic: string, manifestTypeCode: 'J' | 'M', userId: string): IManifest {
        let manifest: IManifest = this.CreateGenericManifest();
        manifest.ManifestUic = manifestUic;
        manifest.ManifestTypeCode = manifestTypeCode;
        manifest.ManifestDateTime = new Date().toISOString();
        manifest.SentToApodDateTime = '0001-01-01T00:00:00';
        manifest.SentToUnitDateTime = '0001-01-01T00:00:00';
        manifest.UserId = userId;
        return manifest;
    }

    static CreateManifestList(): IManifest[] {
        let manifestList: Manifest[] = [];
        return manifestList;
    }
}