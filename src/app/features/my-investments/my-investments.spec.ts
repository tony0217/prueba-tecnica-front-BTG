import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MyInvestments } from './my-investments';

describe('MyInvestments', () => {
  let component: MyInvestments;
  let fixture: ComponentFixture<MyInvestments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyInvestments, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyInvestments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty active investments', () => {
    expect(component.activeInvestments.length).toBe(0);
  });
});
