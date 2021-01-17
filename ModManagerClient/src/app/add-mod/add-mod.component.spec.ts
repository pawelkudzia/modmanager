import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModComponent } from './add-mod.component';

describe('AddModComponent', () => {
  let component: AddModComponent;
  let fixture: ComponentFixture<AddModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
