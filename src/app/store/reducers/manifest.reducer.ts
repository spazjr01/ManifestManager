// Manifest Manager classes and components
import { IManifest } from '../../models/interfaces/manifest.interface';
import { ManifestFactory } from '../../models/factories/manifest.factory';
import { ManifestManagerErrorFactory } from '../../models/factories/manifest-manager-error.factory';
import * as ManifestActions from '../actions/manifest.actions';
import { IManifestState } from '../interfaces/manifest-state.interface';

const initialState: IManifestState = {
    uic: '',
    manifests: ManifestFactory.CreateManifestList(),
    editedManifest: ManifestFactory.CreateGenericManifest(),
    manifestError: ManifestManagerErrorFactory.CreateNoError(),
    loadingManifestList: false,
    loadingManifest: false
};

export function manifestReducer(
    state: IManifestState = initialState,
    action: ManifestActions.ManifestActions) {
    switch (action.type) {
        case ManifestActions.ADD_MANIFEST_START:
        case ManifestActions.EDIT_MANIFEST_START:
            return {
                ...state,
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loadingManifest: true
            };
        case ManifestActions.DELETE_MANIFEST_START:
            return {
                ...state,
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loadingManifestList: true
            };
        case ManifestActions.MANIFEST_SUCCESS:
            return {
                ...state,
                editedManifest: ManifestFactory.CreateGenericManifest(),
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loadingManifestList: false,
                loadingManifest: false
            };
        case ManifestActions.MANIFEST_ERROR:
            return {
                ...state,
                manifestError: ManifestManagerErrorFactory
                    .CreateManifestManagerError(
                        action.payload.functionType,
                        action.payload.errorMessage
                    ),
                loadingManifestList: false,
                loadingManifest: false
            }
        case ManifestActions.EDIT_MANIFEST_CLIENT_ONLY:
            // Note from Richard: Currently, this is used to toggle the details of a manifest.
            // Later, more actions will be needed that are "client only", when there is no
            // connection to the server.
            //
            // Note from Richard: the following logic updates the manifest "immutably".  This is 
            // a very important pattern to follow to manage the state accurately. See
            // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
            // for more information.
            const manifest = state.manifests.find(
                manifest => manifest.ManifestId === action.payload.ManifestId);
            const updatedManifest = {
                ...manifest,
                ...action.payload
            };
            const updatedManifestIndex = getManifestIndex(state.manifests, updatedManifest);
            const updatedManifestList = [...state.manifests];
            updatedManifestList[updatedManifestIndex] = updatedManifest;
            return {
                ...state,
                manifests: updatedManifestList,
                editedManifest: ManifestFactory.CreateGenericManifest()
            };
        case ManifestActions.START_EDIT:
            const manifestForUpdateIndex = getManifestIndex(state.manifests, action.payload);
            const manifestForUpdate = { ...state.manifests[manifestForUpdateIndex] };
            return {
                ...state,
                editedManifest: manifestForUpdate
            };
        case ManifestActions.STOP_EDIT:
            return {
                ...state,
                editedManifest: ManifestFactory.CreateGenericManifest()
            };
        case ManifestActions.GET_MANIFESTS:
            return {
                ...state,
                uic: action.payload,
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loadingManifestList: true
            };
        case ManifestActions.SET_MANIFESTS:
            return {
                ...state,
                manifests: [...action.payload],
                manifestError: ManifestManagerErrorFactory.CreateNoError(),
                loadingManifestList: false
            };
        default:
            return state;
    }

    function getManifestIndex(manifestList: IManifest[], manifest: IManifest): number {
        for (var i = 0; i < manifestList.length; i++) {
            if (manifestList[i].ManifestId === manifest.ManifestId) {
                return i;
            }
        }
        return -1;
    }
}