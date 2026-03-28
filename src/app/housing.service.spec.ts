import { TestBed } from '@angular/core/testing';
import { HousingService } from './housing.service';
import { HousingLocation } from './housing-location';

const mockLocations: HousingLocation[] = [
  { id: 1, name: 'Acme Apartments', city: 'Austin', state: 'TX', photo: 'photo1.jpg', availableUnits: 3, wifi: true, laundry: false },
  { id: 2, name: 'Bay View', city: 'Seattle', state: 'WA', photo: 'photo2.jpg', availableUnits: 1, wifi: false, laundry: true },
];

describe('HousingService', () => {
  let service: HousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllHousingLocations', () => {
    it('should return all housing locations', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({ json: () => Promise.resolve(mockLocations) } as Response)
      );
      const result = await service.getAllHousingLocations();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Acme Apartments');
      expect(result[1].city).toBe('Seattle');
    });

    it('should return empty array when fetch returns null', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({ json: () => Promise.resolve(null) } as Response)
      );
      const result = await service.getAllHousingLocations();
      expect(result).toEqual([]);
    });
  });

  describe('getHousingLocationById', () => {
    it('should return the correct housing location by id', async () => {
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({ json: () => Promise.resolve(mockLocations[0]) } as Response)
      );
      const result = await service.getHousingLocationById(1);
      expect(result?.id).toBe(1);
      expect(result?.name).toBe('Acme Apartments');
    });

    it('should fetch from the correct URL for a given id', async () => {
      const fetchSpy = spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({ json: () => Promise.resolve(mockLocations[1]) } as Response)
      );
      await service.getHousingLocationById(2);
      expect(fetchSpy).toHaveBeenCalledWith(`${service.url}/2`);
    });
  });

  describe('submitApplication', () => {
    it('should log the applicant details to the console', () => {
      spyOn(console, 'log');
      service.submitApplication('Jane', 'Doe', 'jane@example.com');
      expect(console.log).toHaveBeenCalledWith('Jane', 'Doe', 'jane@example.com');
    });
  });
});
