import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFooterComponent } from './inicio-footer.component';

describe('InicioFooterComponent', () => {
  let component: InicioFooterComponent;
  let fixture: ComponentFixture<InicioFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
