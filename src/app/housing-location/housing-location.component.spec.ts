import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousingLocationComponent } from './housing-location.component';
import { HousingLocation } from '../housing-location';
import { provideRouter } from '@angular/router';

const mockLocation: HousingLocation = {
  id: 42,
  name: 'Sunset Villa',
  city: 'Denver',
  state: 'CO',
  photo: 'sunset.jpg',
  availableUnits: 2,
  wifi: true,
  laundry: false,
};

describe('HousingLocationComponent', () => {
  let component: HousingLocationComponent;
  let fixture: ComponentFixture<HousingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocationComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HousingLocationComponent);
    component = fixture.componentInstance;
    component.housingLocation = mockLocation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the housing location name', () => {
    const heading = fixture.nativeElement.querySelector('h2.listing-heading');
    expect(heading.textContent).toContain('Sunset Villa');
  });

  it('should display the city and state', () => {
    const location = fixture.nativeElement.querySelector('p.listing-location');
    expect(location.textContent).toContain('Denver');
    expect(location.textContent).toContain('CO');
  });

  it('should render the listing photo with the correct src', () => {
    const img = fixture.nativeElement.querySelector('img.listing-photo');
    expect(img.getAttribute('src')).toBe('sunset.jpg');
  });

  it('should have a "Learn More" link pointing to the correct details route', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('href')).toBe('/details/42');
  });
});
