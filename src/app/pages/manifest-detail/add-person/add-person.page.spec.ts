import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPersonPage } from './add-person.page';

describe('AddPersonPage', () => {
  let component: AddPersonPage;
  let fixture: ComponentFixture<AddPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
