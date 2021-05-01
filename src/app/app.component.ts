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
    }

    initializeApp() {
    }

    onLogout() {
        this._store.dispatch(AuthActionFactory.CreateLogout());
    }

    onAuthUnit() {
        this._menuController.close('manifestMenu').then(() => {
            this._router.navigateByUrl('/auth-unit');
        });
    }
}
