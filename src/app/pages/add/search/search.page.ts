// Angular libraries
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';

// Ionic libraries
import { Platform, LoadingController, AlertController, ToastController, MenuController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// Manifest Manger classes and components
import { PersonFactory } from '../../../models/factories/person.factory';
import { IAppState } from '../../../store/interfaces/app-state.interface';
import { PersonActionFactory } from '../../../store/factories/person-action.factory';
import { LoadingConstants } from '../../../shared/constants/loading.constants';
import { MessageConstants } from '../../../shared/constants/message.constants';
import { AddPersonSharedComponent } from '../../../pages/add/add-person-shared.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage extends AddPersonSharedComponent {

    @ViewChild('idform') idForm: FormGroupDirective; 

    manifestIdTest: number;
    inputFieldHasFocus: boolean;
    isEdipi: boolean;
    
    constructor(
        menuController: MenuController,
        toastController: ToastController,
        loadingController: LoadingController,
        store: Store<IAppState>,
        platformService: Platform,
        screenOrientationService: ScreenOrientation,
        alertController: AlertController,
    ) {
        super(menuController, toastController, loadingController, store,
            platformService, screenOrientationService, alertController);
        this.isEdipi = true;
    }

    ionViewWillEnter(): void {

        this.platformService.ready().then(() => {
            this.setMenus();
            this.deviceHeight = this.platformService.height();
        });
        this.inputFieldHasFocus = false;
    }

    onSubmit(form: NgForm) {
        this.inputFieldHasFocus = false;

        if (!form.valid) {
            return;
        }
        this.newPerson = PersonFactory.CreatePersonFromID(
            this.manifestId,
            form.value.id,
            this.userId);
        
        this.loadingController.create({
            keyboardClose: true,
            spinner: 'crescent',
            message: LoadingConstants.ADDING_PERSON
        })
            .then(loadingElement => {
                this.store.dispatch(PersonActionFactory.CreateAddPersonStart(this.newPerson));
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
                                if (this.addPersonResult.Success) {
                                    this.displayAddSuccess(this.addPersonResult.Message, form);
                                } else {
                                    this.displayError(this.addPersonResult);
                                }
                            })
                    })
            });
    }

    async displayAddSuccess(toastMessage: string, form: NgForm) {
        const toast = await this.toastController.create({
            message: toastMessage,
            position: 'middle',
            buttons: [
                {
                    text: MessageConstants.OK,
                    role: 'cancel',
                    handler: () => {
                        form.resetForm();
                    }
                }
            ]
        });
        toast.present();
    }

    onEnterInput(): void {
        this.inputFieldHasFocus = true;
    }
}
