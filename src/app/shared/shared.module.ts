// Angular libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

// DTAS classes and components
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DeleteManifestComponent } from '../components/delete-manifest/delete-manifest.component';
import { DeletePersonComponent } from '../components/delete-person/delete-person.component';
import { ManifestMainSmallDisplayComponent } from
    '../components/manifest-main/manifest-main-small-display/manifest-main-small-display.component';
import { ManifestMainMediumDisplayComponent } from
    '../components/manifest-main/manifest-main-medium-display/manifest-main-medium-display.component';
import { ManifestMainLargeDisplayComponent } from
    '../components/manifest-main/manifest-main-large-display/manifest-main-large-display.component';
import { ManifestDetailSmallDisplayComponent } from
    '../components/manifest-detail/manifest-detail-small-display/manifest-detail-small-display.component';
import { ManifestDetailMediumDisplayComponent } from
    '../components/manifest-detail/manifest-detail-medium-display/manifest-detail-medium-display.component';
import { ManifestDetailLargeDisplayComponent } from
    '../components/manifest-detail/manifest-detail-large-display/manifest-detail-large-display.component';
import { PersonDetailSmallDisplayComponent } from
    '../components/person-detail/person-detail-small-display/person-detail-small-display.component';
import { PersonDetailMediumDisplayComponent } from
    '../components/person-detail/person-detail-medium-display/person-detail-medium-display.component';
import { PersonDetailLargeDisplayComponent } from
    '../components/person-detail/person-detail-large-display/person-detail-large-display.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        DeleteManifestComponent,
        DeletePersonComponent,
        ManifestMainSmallDisplayComponent,
        ManifestMainMediumDisplayComponent,
        ManifestMainLargeDisplayComponent,
        ManifestDetailSmallDisplayComponent,
        ManifestDetailMediumDisplayComponent,
        ManifestDetailLargeDisplayComponent,
        PersonDetailSmallDisplayComponent,
        PersonDetailMediumDisplayComponent,
        PersonDetailLargeDisplayComponent

    ],
    entryComponents: [
        DeleteManifestComponent,
        DeletePersonComponent
    ],
    imports: [
        CommonModule, IonicModule, FormsModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        ManifestMainSmallDisplayComponent,
        ManifestMainMediumDisplayComponent,
        ManifestMainLargeDisplayComponent,
        ManifestDetailSmallDisplayComponent,
        ManifestDetailMediumDisplayComponent,
        ManifestDetailLargeDisplayComponent,
        PersonDetailSmallDisplayComponent,
        PersonDetailMediumDisplayComponent,
        PersonDetailLargeDisplayComponent,
        CommonModule,
        IonicModule,
        FormsModule
    ]
})

export class SharedModule {}

