import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNavListComponent } from './footer-nav-list.component';

describe('FooterNavListComponent', () => {
  let component: FooterNavListComponent;
  let fixture: ComponentFixture<FooterNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNavListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
