import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPComponent } from './description-p.component';

describe('DescriptionPComponent', () => {
  let component: DescriptionPComponent;
  let fixture: ComponentFixture<DescriptionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
