import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapitreSingleComponent } from './chapitre-single.component';


describe('ChapitreSingleComponent', () => {
  let component: ChapitreSingleComponent;
  let fixture: ComponentFixture<ChapitreSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapitreSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapitreSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
