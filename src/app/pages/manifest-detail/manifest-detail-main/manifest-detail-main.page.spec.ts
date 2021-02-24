import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestDetailMainPage } from './manifest-detail-main.page';

describe('ManifestDetailMainPage', () => {
  let component: ManifestDetailMainPage;
  let fixture: ComponentFixture<ManifestDetailMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestDetailMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestDetailMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
