import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJumpManifestPage } from './add-jump-manifest.page';

describe('AddJumpManifestPage', () => {
  let component: AddJumpManifestPage;
  let fixture: ComponentFixture<AddJumpManifestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJumpManifestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJumpManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
