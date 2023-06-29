import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoTelaComponent } from './topo-tela.component';

describe('TopoTelaComponent', () => {
  let component: TopoTelaComponent;
  let fixture: ComponentFixture<TopoTelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopoTelaComponent]
    });
    fixture = TestBed.createComponent(TopoTelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
