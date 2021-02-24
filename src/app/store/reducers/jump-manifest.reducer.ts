// Manifest Manager classes and components
import { IJumpManifestState } from '../interfaces/jump-manifest-state.interface';
import * as JumpManifestActions from '../actions/jump-manifest.actions';

const initialState: IJumpManifestState = {
    placeHolder: ''
};

export function jumpManifestReducer(
    state = initialState,
    action: JumpManifestActions.JumpManifestActions) {
    switch (action.type) {
        case JumpManifestActions.PLACE_HOLDER_ACTION:
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
}