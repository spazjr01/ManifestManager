// Angular libraries
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

// Ionic libraries
import { MenuController } from '@ionic/angular';

// Other libraries

// DTAS classes and components
import { IAppState } from './store/interfaces/app-state.interface';
import { AuthActionFactory } from './store/factories/auth-action.factory';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private _store: Store<IAppState>,
        private _router: Router,
        private _menuController: MenuController
    ) {
        this.initializeApp();
        this._store.select('authState').subscribe(authState => {
            if (authState.authenticated) {
                this._router.navigateByUrl('/auth-unit');
            }
        });
    }

    initializeApp() {
    }

    onLogout() {
        this._store.dispatch(AuthActionFactory.CreateLogoutStart());
    }

    onAuthUnit() {
        this._menuController.close('manifestMenu').then(() => {
            this._router.navigateByUrl('/auth-unit');
        });
    }
}
