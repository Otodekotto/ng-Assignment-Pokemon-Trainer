import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardButtonComponent } from './info-card-button.component';

describe('InfoCardButtonComponent', () => {
  let component: InfoCardButtonComponent;
  let fixture: ComponentFixture<InfoCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
