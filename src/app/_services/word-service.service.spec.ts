import { TestBed } from '@angular/core/testing';

import { WordServiceService } from './word-service.service';

describe('WordServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordServiceService = TestBed.get(WordServiceService);
    expect(service).toBeTruthy();
  });
});
