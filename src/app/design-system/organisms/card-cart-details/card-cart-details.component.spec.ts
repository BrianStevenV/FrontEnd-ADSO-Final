import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCartDetailsComponent } from './card-cart-details.component';

describe('CardCartDetailsComponent', () => {
  let component: CardCartDetailsComponent;
  let fixture: ComponentFixture<CardCartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCartDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
