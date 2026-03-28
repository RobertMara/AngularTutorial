import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { provideRouter } from '@angular/router';

const mockLocations: HousingLocation[] = [
  { id: 1, name: 'Acme Apartments', city: 'Austin', state: 'TX', photo: 'photo1.jpg', availableUnits: 3, wifi: true, laundry: false },
  { id: 2, name: 'Bay View', city: 'Seattle', state: 'WA', photo: 'photo2.jpg', availableUnits: 1, wifi: false, laundry: true },
  { id: 3, name: 'Capitol Hill', city: 'Austin', state: 'TX', photo: 'photo3.jpg', availableUnits: 5, wifi: true, laundry: true },
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHousingService: jasmine.SpyObj<HousingService>;

  beforeEach(async () => {
    mockHousingService = jasmine.createSpyObj('HousingService', ['getAllHousingLocations']);
    mockHousingService.getAllHousingLocations.and.returnValue(Promise.resolve(mockLocations));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: HousingService, useValue: mockHousingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one card per housing location on load', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-housing-location');
    expect(cards.length).toBe(3);
  });

  it('should filter listings by city (case-insensitive)', () => {
    component.filterResults('austin');
    fixture.detectChanges();
    expect(component.filteredLocationList.length).toBe(2);
    expect(component.filteredLocationList.every(l => l.city.toLowerCase() === 'austin')).toBeTrue();
  });

  it('should return no results when the city does not match any listing', () => {
    component.filterResults('Miami');
    fixture.detectChanges();
    expect(component.filteredLocationList.length).toBe(0);
  });

  it('should reset to the full list when the filter text is cleared', () => {
    component.filterResults('Austin');
    fixture.detectChanges();
    expect(component.filteredLocationList.length).toBe(2);

    component.filterResults('');
    fixture.detectChanges();
    expect(component.filteredLocationList.length).toBe(3);
  });

  it('should match partial city names', () => {
    component.filterResults('sea');
    fixture.detectChanges();
    expect(component.filteredLocationList.length).toBe(1);
    expect(component.filteredLocationList[0].city).toBe('Seattle');
  });
});
