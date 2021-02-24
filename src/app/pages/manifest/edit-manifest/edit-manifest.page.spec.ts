import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManifestPage } from './edit-manifest.page';

describe('EditManifestPage', () => {
  let component: EditManifestPage;
  let fixture: ComponentFixture<EditManifestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManifestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
