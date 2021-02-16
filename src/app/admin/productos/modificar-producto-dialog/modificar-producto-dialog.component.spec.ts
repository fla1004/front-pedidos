import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductoDialogComponent } from './modificar-producto-dialog.component';

describe('ModificarProductoDialogComponent', () => {
  let component: ModificarProductoDialogComponent;
  let fixture: ComponentFixture<ModificarProductoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarProductoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
