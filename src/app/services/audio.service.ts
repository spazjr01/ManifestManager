// Ionic library
import { Injectable } from '@angular/core';

// Ionic Angular library
import { Platform } from '@ionic/angular';

// Ionic Native library
import { NativeAudio } from '@ionic-native/native-audio/ngx';

// Manifest Manager classes and components
import { ISound } from '../models/interfaces/sound.interface';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    private sounds: ISound[] = [];
    private audioPlayer: HTMLAudioElement = new Audio();
    private forceWebAudio: boolean = true;

    constructor(private platform: Platform, private nativeAudio: NativeAudio) { }

    preload(key: string, asset: string): void {
        if (this.platform.is('cordova') && !this.forceWebAudio) {
            this.nativeAudio.preloadSimple(key, asset);
            this.sounds.push({
                Key: key,
                Asset: asset,
                IsNative: true
            });
        } else {
            let audio = new Audio();
            audio.src = asset;
            this.sounds.push({
                Key: key,
                Asset: asset,
                IsNative: false
            });
        }
    }

    async play(key: string) {
        let soundToPlay = this.sounds.find((sound) => {
            return sound.Key === key;
        });

        if (soundToPlay.IsNative) {
            this.nativeAudio.play(soundToPlay.Asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        } else {
            this.audioPlayer.src = soundToPlay.Asset;
            this.audioPlayer.play();
        }
    }
}