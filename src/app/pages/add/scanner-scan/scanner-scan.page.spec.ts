import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScannerScanPage } from './scanner-scan.page';

describe('ScannerScanPage', () => {
  let component: ScannerScanPage;
  let fixture: ComponentFixture<ScannerScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
