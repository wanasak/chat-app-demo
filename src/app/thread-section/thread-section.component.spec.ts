import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSectionComponent } from './thread-section.component';

describe('ThreadSelectionComponent', () => {
  let component: ThreadSectionComponent;
  let fixture: ComponentFixture<ThreadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
