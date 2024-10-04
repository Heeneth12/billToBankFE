import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillToBankComponent } from './bill-to-bank.component';

describe('BillToBankComponent', () => {
  let component: BillToBankComponent;
  let fixture: ComponentFixture<BillToBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillToBankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillToBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
