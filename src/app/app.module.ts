// Angular libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// Ionic libraries
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

// Other libraries
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { environment } from '../environments/environment'; 


// Manifest Manager classes and components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { appReducer } from './store/reducers/app.reducer';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthUnitEffects } from './store/effects/auth-unit.effects';
import { ManifestEffects } from './store/effects/manifest.effects';
import { PersonEffects } from './store/effects/person.effects'
import { JumpManifestEffects } from './store/effects/jump-manifest.effects';
import { SettingEffects } from './store/effects/setting.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([
            AuthEffects, AuthUnitEffects,
            ManifestEffects, PersonEffects,
            JumpManifestEffects,
            SettingEffects 
        ]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot(),
        NgbModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        NativeAudio,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
