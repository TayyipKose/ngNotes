import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTablesComponent } from './end-tables.component';

describe('EndTablesComponent', () => {
  let component: EndTablesComponent;
  let fixture: ComponentFixture<EndTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndTablesComponent]
    });
    fixture = TestBed.createComponent(EndTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
