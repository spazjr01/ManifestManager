import { IManifestState } from './manifest-state.interface';
import { IAuthState } from './auth-state.interface';
import { IAuthUnitState } from './auth-unit-state.interface';
import { IPersonState } from './person-state.interface';
import { IJumpManifestState } from './jump-manifest-state.interface';
import { ISettingState } from './setting-state.interface'

export interface IAppState {
    authState: IAuthState;
    authUnitState: IAuthUnitState;
    manifestState: IManifestState;
    personState: IPersonState;
    jumpManifestState: IJumpManifestState;
    settingState: ISettingState;
}