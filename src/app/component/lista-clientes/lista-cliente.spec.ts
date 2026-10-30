import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPessoa } from './lista-cliente';

describe('ListaPessoa', () => {
  let component: ListaPessoa;
  let fixture: ComponentFixture<ListaPessoa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPessoa],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPessoa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
