// Angular libraries
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';

@Injectable()
export class JumpManifestEffects {

    constructor(
        private _actions$: Actions,
        private _router: Router
    ) { }
}
