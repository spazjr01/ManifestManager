// Manifest Manager classes and components
import { ISetting } from '../../models/interfaces/setting.interface';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';

export interface ISettingState {
    settings: ISetting[];
    editedSetting: ISetting;
    settingError: IManifestManagerError;
    loading: boolean;
}