import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesJeuxComponent } from './mes-jeux.component';

describe('MesJeuxComponent', () => {
  let component: MesJeuxComponent;
  let fixture: ComponentFixture<MesJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesJeuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
