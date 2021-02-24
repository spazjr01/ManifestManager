import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManifestDetailLargeDisplayComponent } from './manifest-detail-large-display.component';

describe('ManifestDetailLargeDisplayComponent', () => {
  let component: ManifestDetailLargeDisplayComponent;
  let fixture: ComponentFixture<ManifestDetailLargeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestDetailLargeDisplayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifestDetailLargeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
