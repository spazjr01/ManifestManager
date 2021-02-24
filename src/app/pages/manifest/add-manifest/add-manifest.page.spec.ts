import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManifestPage } from './add-manifest.page';

describe('AddManifestPage', () => {
  let component: AddManifestPage;
  let fixture: ComponentFixture<AddManifestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManifestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
