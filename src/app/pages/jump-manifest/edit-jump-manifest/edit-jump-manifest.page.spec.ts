import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJumpManifestPage } from './edit-jump-manifest.page';

describe('EditJumpManifestPage', () => {
  let component: EditJumpManifestPage;
  let fixture: ComponentFixture<EditJumpManifestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJumpManifestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJumpManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
