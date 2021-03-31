import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionAchatJeuComponent } from './suppression-achat-jeu.component';

describe('SuppressionAchatJeuComponent', () => {
  let component: SuppressionAchatJeuComponent;
  let fixture: ComponentFixture<SuppressionAchatJeuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppressionAchatJeuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionAchatJeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
