import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPagComponent } from './team-pag.component';

describe('TeamPagComponent', () => {
  let component: TeamPagComponent;
  let fixture: ComponentFixture<TeamPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
