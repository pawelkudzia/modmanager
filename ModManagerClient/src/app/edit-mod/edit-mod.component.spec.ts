import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModComponent } from './edit-mod.component';

describe('EditModComponent', () => {
  let component: EditModComponent;
  let fixture: ComponentFixture<EditModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
