import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectForm } from './defect-form';
import { provideRouter } from '@angular/router';

describe('DefectForm', () => {
  let component: DefectForm;
  let fixture: ComponentFixture<DefectForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DefectForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
