import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingVideoComponent } from './floating-video.component';

describe('FloatingVideoComponent', () => {
  let component: FloatingVideoComponent;
  let fixture: ComponentFixture<FloatingVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
