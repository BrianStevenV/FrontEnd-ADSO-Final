import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitComponent } from './form-submit.component';

describe('FormSubmitComponent', () => {
  let component: FormSubmitComponent;
  let fixture: ComponentFixture<FormSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
