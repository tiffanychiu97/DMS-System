import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectList } from './defect-list';

describe('DefectList', () => {
  let component: DefectList;
  let fixture: ComponentFixture<DefectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectList],
    }).compileComponents();

    fixture = TestBed.createComponent(DefectList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
