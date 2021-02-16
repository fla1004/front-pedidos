import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsuarioDialogComponent } from './create-usuario-dialog.component';

describe('CreateUsuarioDialogComponent', () => {
  let component: CreateUsuarioDialogComponent;
  let fixture: ComponentFixture<CreateUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUsuarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
