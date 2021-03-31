import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentaireComponent } from './edit-commentaire.component';

describe('EditCommentaireComponent', () => {
  let component: EditCommentaireComponent;
  let fixture: ComponentFixture<EditCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommentaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
