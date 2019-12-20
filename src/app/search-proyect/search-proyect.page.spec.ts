import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProyectPage } from './search-proyect.page';

describe('SearchProyectPage', () => {
  let component: SearchProyectPage;
  let fixture: ComponentFixture<SearchProyectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProyectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProyectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
