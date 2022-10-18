import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupsComponent } from './new-groups.component';

describe('NewGroupsComponent', () => {
  let component: NewGroupsComponent;
  let fixture: ComponentFixture<NewGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
