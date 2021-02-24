import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonDetailSmallDisplayComponent } from './person-detail-small-display.component';

describe('PersonDetailSmallDisplayComponent', () => {
  let component: PersonDetailSmallDisplayComponent;
  let fixture: ComponentFixture<PersonDetailSmallDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailSmallDisplayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetailSmallDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
