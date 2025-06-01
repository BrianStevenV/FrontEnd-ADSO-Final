import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionAttributesComponent } from './definition-attributes.component';

describe('DefinitionAttributesComponent', () => {
  let component: DefinitionAttributesComponent;
  let fixture: ComponentFixture<DefinitionAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinitionAttributesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinitionAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
