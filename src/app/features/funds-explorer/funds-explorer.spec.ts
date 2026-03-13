import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FundsExplorer } from './funds-explorer';

describe('FundsExplorer', () => {
  let component: FundsExplorer;
  let fixture: ComponentFixture<FundsExplorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsExplorer, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundsExplorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with ALL filter', () => {
    expect(component.activeFilter).toBe('ALL');
  });

  it('should filter by FPV', () => {
    component.funds = [
      { id: '1', name: 'FPV Fund', minAmount: 75000, category: 'FPV' },
      { id: '2', name: 'FIC Fund', minAmount: 50000, category: 'FIC' }
    ];
    component.applyFilter('FPV');
    expect(component.filteredFunds.length).toBe(1);
    expect(component.filteredFunds[0].category).toBe('FPV');
  });

  it('should filter by FIC', () => {
    component.funds = [
      { id: '1', name: 'FPV Fund', minAmount: 75000, category: 'FPV' },
      { id: '2', name: 'FIC Fund', minAmount: 50000, category: 'FIC' }
    ];
    component.applyFilter('FIC');
    expect(component.filteredFunds.length).toBe(1);
    expect(component.filteredFunds[0].category).toBe('FIC');
  });

  it('should show all funds with ALL filter', () => {
    component.funds = [
      { id: '1', name: 'FPV Fund', minAmount: 75000, category: 'FPV' },
      { id: '2', name: 'FIC Fund', minAmount: 50000, category: 'FIC' }
    ];
    component.applyFilter('ALL');
    expect(component.filteredFunds.length).toBe(2);
  });
});
