import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpManifestDetailPage } from './jump-manifest-detail.page';

describe('JumpManifestDetailPage', () => {
  let component: JumpManifestDetailPage;
  let fixture: ComponentFixture<JumpManifestDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumpManifestDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpManifestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
