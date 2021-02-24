// Manifest Manager classes and components
import { IManifest } from '../../models/interfaces/manifest.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';

export interface IManifestState {
    uic: string;
    manifests: IManifest[];
    editedManifest: IManifest;
    manifestError: IManifestManagerError;
    loadingManifestList: boolean;
    loadingManifest: boolean;
}