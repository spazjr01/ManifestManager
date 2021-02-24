// Other libraries
import { ActionReducerMap } from '@ngrx/store';

// Manifest Manager classes and components
import { IAppState } from '../interfaces/app-state.interface';
import { manifestReducer } from './manifest.reducer';
import { authReducer } from './auth.reducer';
import { authUnitReducer } from './auth-unit.reducer';
import { personReducer } from './person.reducer';
import { jumpManifestReducer } from './jump-manifest.reducer';
import { settingReducer } from './setting.reducer';


export const appReducer: ActionReducerMap<IAppState> = {
    authState: authReducer,
    authUnitState: authUnitReducer,
    manifestState: manifestReducer,
    personState: personReducer,
    jumpManifestState: jumpManifestReducer,
    settingState: settingReducer
}