import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatCategoryComponent } from './creat-category.component';

describe('CreatCategoryComponent', () => {
  let component: CreatCategoryComponent;
  let fixture: ComponentFixture<CreatCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
