import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualPage } from './manual.page';

describe('ManualPage', () => {
  let component: ManualPage;
  let fixture: ComponentFixture<ManualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
