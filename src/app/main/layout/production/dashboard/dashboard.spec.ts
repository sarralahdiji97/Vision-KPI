import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEfficience } from './dashboard';

describe('DashboardEfficience', () => {
  let component: DashboardEfficience;
  let fixture: ComponentFixture<DashboardEfficience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEfficience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEfficience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
