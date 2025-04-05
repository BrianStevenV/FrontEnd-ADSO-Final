import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseHamburguerButtonComponent } from './close-hamburguer-button.component';

describe('CloseHamburguerButtonComponent', () => {
  let component: CloseHamburguerButtonComponent;
  let fixture: ComponentFixture<CloseHamburguerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseHamburguerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseHamburguerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
