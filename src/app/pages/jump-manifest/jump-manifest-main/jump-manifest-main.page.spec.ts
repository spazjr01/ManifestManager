import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpManifestMainPage } from './jump-manifest-main.page';

describe('JumpManifestMainPage', () => {
  let component: JumpManifestMainPage;
  let fixture: ComponentFixture<JumpManifestMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumpManifestMainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpManifestMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
