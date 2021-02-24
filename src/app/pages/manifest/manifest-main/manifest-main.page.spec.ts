import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestMainPage } from './manifest-main.page';

describe('ManifestMainPage', () => {
  let component: ManifestMainPage;
  let fixture: ComponentFixture<ManifestMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
