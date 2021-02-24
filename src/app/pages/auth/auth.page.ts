// Angular libraries
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// Ionic libraries
import { LoadingController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { AuthActionFactory } from '../../store/factories/auth-action.factory';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';
import { ErrorType } from '../../shared/enumerations/enumerations';
import { LoadingConstants } from '../../shared/constants/loading.constants';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})

export class AuthPage extends BaseComponent implements OnInit {

    inputFieldHasFocus: boolean;

    constructor(
        private _loadingController: LoadingController,
        private _router: Router,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.inputFieldHasFocus = false;
    }

    ngOnInit(): void {
        this.store.select('authState').subscribe(authState => {
            this.error = authState.authError;
            this.isLoading = authState.loading;
        });
    }

    onSubmit(form: NgForm): void {
        this.inputFieldHasFocus = false;

        if (!form.valid) {
            return;
        }

        this._loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.LOGGIN_IN
        })
            .then(loadingElement => {
                this.store.dispatch(AuthActionFactory.CreateLoginStart({ userId: form.value.userId, password: form.value.password }));
                loadingElement.present()
                    .then(() => {
                        while (this.isLoading) { }
                        loadingElement.dismiss()
                            .then(() => {
                                if (this.error.ErrorType !== ErrorType.NoError) {
                                    throw (this.error);
                                } else {
                                    this._router.navigateByUrl('/auth-unit');
                                }
                            })
                            .catch((error: IManifestManagerError) => {
                                this.displayError(error);
                            });
                    });
            });
    }

    ionViewWillEnter() {
        this.deviceHeight = this.platformService.height();
    }

    onEnterInput() {
        this.inputFieldHasFocus = true;
    }
}
