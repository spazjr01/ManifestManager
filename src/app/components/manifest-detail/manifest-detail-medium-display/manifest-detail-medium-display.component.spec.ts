import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManifestDetailMediumDisplayComponent } from './manifest-detail-medium-display.component';

describe('ManifestDetailMediumDisplayComponent', () => {
  let component: ManifestDetailMediumDisplayComponent;
  let fixture: ComponentFixture<ManifestDetailMediumDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestDetailMediumDisplayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifestDetailMediumDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
