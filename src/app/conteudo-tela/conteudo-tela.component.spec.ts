import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoTelaComponent } from './conteudo-tela.component';

describe('ConteudoTelaComponent', () => {
  let component: ConteudoTelaComponent;
  let fixture: ComponentFixture<ConteudoTelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConteudoTelaComponent]
    });
    fixture = TestBed.createComponent(ConteudoTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
