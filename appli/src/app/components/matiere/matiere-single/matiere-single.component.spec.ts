import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereSingleComponent } from './matiere-single.component';

describe('MatiereSingleComponent', () => {
  let component: MatiereSingleComponent;
  let fixture: ComponentFixture<MatiereSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatiereSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
