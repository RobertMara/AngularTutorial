import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';

const mockLocation: HousingLocation = {
  id: 5,
  name: 'Riverside Retreat',
  city: 'Portland',
  state: 'OR',
  photo: 'river.jpg',
  availableUnits: 4,
  wifi: true,
  laundry: true,
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockHousingService: jasmine.SpyObj<HousingService>;

  beforeEach(async () => {
    mockHousingService = jasmine.createSpyObj('HousingService', [
      'getHousingLocationById',
      'submitApplication',
    ]);
    mockHousingService.getHousingLocationById.and.returnValue(Promise.resolve(mockLocation));

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        provideRouter([]),
        { provide: HousingService, useValue: mockHousingService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '5' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have firstName, lastName, and email form controls', () => {
    expect(component.applyForm.contains('firstName')).toBeTrue();
    expect(component.applyForm.contains('lastName')).toBeTrue();
    expect(component.applyForm.contains('email')).toBeTrue();
  });

  it('should load the housing location using the route id', () => {
    expect(mockHousingService.getHousingLocationById).toHaveBeenCalledWith(5);
    expect(component.housingLocation?.name).toBe('Riverside Retreat');
    expect(component.housingLocation?.city).toBe('Portland');
  });

  it('should display the housing location name and location', () => {
    const heading = fixture.nativeElement.querySelector('h2.listing-heading');
    const location = fixture.nativeElement.querySelector('p.listing-location');
    expect(heading.textContent).toContain('Riverside Retreat');
    expect(location.textContent).toContain('Portland');
    expect(location.textContent).toContain('OR');
  });

  it('should call submitApplication with the form values when submitted', () => {
    component.applyForm.setValue({ firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com' });
    component.submitApplication();
    expect(mockHousingService.submitApplication).toHaveBeenCalledWith('Jane', 'Smith', 'jane@test.com');
  });

  it('should pass empty strings for null form values when submitted', () => {
    component.applyForm.setValue({ firstName: null, lastName: null, email: null });
    component.submitApplication();
    expect(mockHousingService.submitApplication).toHaveBeenCalledWith('', '', '');
  });
});
