import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPublicoViewComponent } from './perfil-publico-view.component';

describe('PerfilPublicoViewComponent', () => {
  let component: PerfilPublicoViewComponent;
  let fixture: ComponentFixture<PerfilPublicoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPublicoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPublicoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
