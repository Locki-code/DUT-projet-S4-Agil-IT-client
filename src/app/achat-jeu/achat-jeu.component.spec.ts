import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatJeuComponent } from './achat-jeu.component';

describe('AchatJeuComponent', () => {
  let component: AchatJeuComponent;
  let fixture: ComponentFixture<AchatJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchatJeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
