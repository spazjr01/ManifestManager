// Angular libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Ionic libraries
import { IonicModule } from '@ionic/angular';

import { CameraScanPage } from './camera-scan.page';

describe('ScannerPage', () => {
    let component: CameraScanPage;
    let fixture: ComponentFixture<CameraScanPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CameraScanPage ],
            imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
