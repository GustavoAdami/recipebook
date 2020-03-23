import { TestBed } from '@angular/core/testing';

import { RecipesListService } from './recipes-list.service';

describe('RecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipesListService = TestBed.get(RecipesListService);
    expect(service).toBeTruthy();
  });
});
