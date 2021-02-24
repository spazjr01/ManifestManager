// Angular libraries
import { Component, OnInit } from '@angular/core';

// Manifest Manager classes and components
import { IManifest } from '../../../models/interfaces/manifest.interface';

@Component({
    selector: 'app-jump-manifest-main',
    templateUrl: './jump-manifest-main.page.html',
    styleUrls: ['./jump-manifest-main.page.scss'],
})
export class JumpManifestMainPage implements OnInit {
    jumpManifests: IManifest[];
    constructor() {
        this.jumpManifests = [];
    }

    ngOnInit() {
    }
}
