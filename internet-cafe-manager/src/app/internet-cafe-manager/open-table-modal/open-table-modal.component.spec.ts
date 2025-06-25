import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTableModalComponent } from './open-table-modal.component';

describe('OpenTableModalComponent', () => {
  let component: OpenTableModalComponent;
  let fixture: ComponentFixture<OpenTableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenTableModalComponent]
    });
    fixture = TestBed.createComponent(OpenTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
