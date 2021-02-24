import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUnitPage } from './auth-unit.page';

describe('AuthUnitPage', () => {
  let component: AuthUnitPage;
  let fixture: ComponentFixture<AuthUnitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUnitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
