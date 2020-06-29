import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExistingComponent } from './category-existing.component';

describe('CategoryExistingComponent', () => {
  let component: CategoryExistingComponent;
  let fixture: ComponentFixture<CategoryExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
