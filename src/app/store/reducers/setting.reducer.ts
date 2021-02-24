// Manifest Manager classes and components
import { ISetting } from '../../models/interfaces/setting.interface';
import * as SettingActions from '../actions/setting.actions'
import { ISettingState } from '../interfaces/setting-state.interface';
import { SettingFactory } from '../../models/factories/setting.factory';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';import { ManifestManagerError } from 'src/app/models/manifest-manager-error.model';

const initialState: ISettingState = {
    settings: [
        SettingFactory.CreateSetting(1, 'Display DTAS functions', true, 'This setting turns on/off DTAS-specific functionality.'),
        SettingFactory.CreateSetting(2, 'Include 508 Compliance', false, 'This setting turns on/off 508 Compliance support.')
    ],
    loading: false,
    editedSetting: null,
    settingError: ManifestManagerErrorFactory.CreateNoError()

}

export function settingReducer(
    state = initialState,
    action: SettingActions.SettingActions
) {
    switch (action.type) {
        case SettingActions.EDIT_SETTING_START:
            return {
                ...state,
                settingError: ManifestManagerErrorFactory.CreateNoError(),
                loading: true
            };
        case SettingActions.SETTING_SUCCESS:
            return {
                ...state,
                editedsetting: null,
                settingError: ManifestManagerErrorFactory.CreateNoError(),
                loading: false
            };
        case SettingActions.SETTING_ERROR:
            return {
                ...state,
                manifestError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage
                    ),
                loading: false
            }
        case SettingActions.EDIT_SETTING_CLIENT_ONLY:
            // Note from Richard: Currently, this is used to change the setting locally only.
            //
            // Note from Richard: the following logic updates the manifest "immutably".  This is 
            // a very important pattern to follow to manage the state accurately. See
            // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
            // for more information.
            const setting = state.settings.find(
                setting => setting.SettingId === action.payload.SettingId);
            const updatedSetting = {
                ...setting,
                ...action.payload
            };
            const updatedSettingIndex = getSettingIndex(state.settings, updatedSetting);
            const updatedSettingList = [...state.settings];
            updatedSettingList[updatedSettingIndex] = updatedSetting;
            return {
                ...state,
                settings: updatedSettingList,
                editedSetting: null
            };
        case SettingActions.START_EDIT:
            const settingForUpdateIndex = getSettingIndex(state.settings, action.payload);
            const settingForUpdate = { ...state.settings[settingForUpdateIndex] };
            return {
                ...state,
                editedSetting: settingForUpdate
            };
        case SettingActions.STOP_EDIT:
            return {
                ...state,
                editedSetting: null
            };
        case SettingActions.GET_SETTINGS:
            return {
                ...state,
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loading: true
            };
        case SettingActions.SET_SETTINGS:
            return {
                ...state,
                settings: [...action.payload],
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loading: false
            };
        default:
            return {
                ...state
            };
    }

    function getSettingIndex(settingList: ISetting[], setting: ISetting): number {
        for (var i = 0; i < settingList.length; i++) {
            if (settingList[i].SettingId === setting.SettingId) {
                return i;
            }
        }
        return -1;
    }
}
