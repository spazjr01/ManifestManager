import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManifestDetailSmallDisplayComponent } from './manifest-detail-small-display.component';

describe('ManifestDetailSmallDisplayComponent', () => {
  let component: ManifestDetailSmallDisplayComponent;
  let fixture: ComponentFixture<ManifestDetailSmallDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestDetailSmallDisplayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifestDetailSmallDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
