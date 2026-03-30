import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleTestComponent } from './circle-test.component';

describe('CircleTestComponent', () => {
  let component: CircleTestComponent;
  let fixture: ComponentFixture<CircleTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircleTestComponent]
    });
    fixture = TestBed.createComponent(CircleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
