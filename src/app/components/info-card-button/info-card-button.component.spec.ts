import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardButtonComponent } from './info-card-button.component';

describe('InfoCardButtonComponent', () => {
  let component: InfoCardButtonComponent;
  let fixture: ComponentFixture<InfoCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//<button
//    (click)="onButtonClick()"
//    class="text-m font-bold mt-6 px-4 py-2 bg-red-700 text-white rounded-lg tracking-wider hover:bg-orange-500 outline-none btn"
//  >release</button>
