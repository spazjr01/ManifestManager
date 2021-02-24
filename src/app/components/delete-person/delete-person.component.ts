// Angular libraries
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

// Ionic libraries
import { ModalController, LoadingController, Platform, AlertController } from '@ionic/angular';

// Other libraries
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manager classes and components
import { IPerson } from '../../models/interfaces/person.interface';
import { PersonFactory } from '../../models/factories/person.factory';
import { IManifestManagerError } from '../../models/interfaces/manifest-manager-error.interface';
import { BaseComponent } from '../../shared/base.component';
import { IAppState } from '../../store/interfaces/app-state.interface';
import { PersonActionFactory } from '../../store/factories/person-action.factory';
import { ErrorType } from '../../shared/enumerations/enumerations';
import { LoadingConstants } from '../../shared/constants/loading.constants';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss'],
})
export class DeletePersonComponent extends BaseComponent implements OnInit, OnDestroy {

    private _personSubscription: Subscription;
    private _deleteSubscription: Subscription;
    personToDelete: IPerson;

    constructor(
        private _modalController: ModalController,
        private _loadingController: LoadingController,
        screenPlatformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
        store: Store<IAppState>
    ) {
        super(screenPlatformService, screenOrientationService,
            alertController, store);
        this.personToDelete = PersonFactory.CreateGenericPerson();
        this._personSubscription = new Subscription();
        this._deleteSubscription = new Subscription();
    }

    ngOnInit() {
        this._personSubscription = this.store.select('personState').subscribe(personState => {
            this.error = personState.personError;
            this.isLoading = personState.loadingPerson;
            this.personToDelete = personState.editedPerson;
        });
    }

    onDelete() {
        this._loadingController.create({
            spinner: 'crescent',
            message: LoadingConstants.DELETING_PERSON
        })
            .then(loadingElement => {
                this.store.dispatch(PersonActionFactory.CreateDeletePersonStart(this.personToDelete));
                loadingElement.present()
                    .then(() => {
                        const pause: number = 1;
                        while (pause === 1) {
                            if (!this.isLoading) {
                                break;
                            }
                        }
                        loadingElement.dismiss()
                            .then(() => {
                                if (this.error.ErrorType !== ErrorType.NoError) {
                                    throw (this.error);
                                } else {
                                    this._modalController.dismiss({
                                        'deleted': true
                                    });
                                }
                            })
                            .catch((error: IManifestManagerError) => {
                                this.displayError(error);
                            });
                    });
            });
    }

    onCancel() {
        this._modalController.dismiss(null, 'cancel');
    }

    ngOnDestroy() {
        if (this._personSubscription) {
            this._personSubscription.unsubscribe();
        }

        if (this._deleteSubscription) {
            this._deleteSubscription.unsubscribe();
        }

        this.store.dispatch(PersonActionFactory.CreateStopEdit());
    }

}
