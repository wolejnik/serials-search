import { TestBed } from '@angular/core/testing';

import { ColorRatingService } from './color-rating.service';

describe('ColorRatingService', () => {
  let service: ColorRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
