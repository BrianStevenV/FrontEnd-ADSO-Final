import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureWithContentComponent } from './figure-with-content.component';

describe('FigureWithContentComponent', () => {
  let component: FigureWithContentComponent;
  let fixture: ComponentFixture<FigureWithContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FigureWithContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigureWithContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
