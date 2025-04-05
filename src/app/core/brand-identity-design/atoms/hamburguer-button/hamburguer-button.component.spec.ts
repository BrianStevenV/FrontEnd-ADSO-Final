import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburguerButtonComponent } from './hamburguer-button.component';

describe('HamburguerButtonComponent', () => {
  let component: HamburguerButtonComponent;
  let fixture: ComponentFixture<HamburguerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburguerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburguerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
