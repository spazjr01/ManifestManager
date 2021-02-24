// Angular libraries
import { Action } from '@ngrx/store';

export const PLACE_HOLDER_ACTION = '[Jump Manifest] Place Holder Action';

export class PlaceHolderAction implements Action {
    readonly type = PLACE_HOLDER_ACTION;
}

export type JumpManifestActions = PlaceHolderAction;