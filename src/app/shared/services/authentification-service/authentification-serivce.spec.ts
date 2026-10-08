import { TestBed } from '@angular/core/testing';

import { AuthentificationSerivce } from './authentification-serivce';

describe('AuthentificationSerivce', () => {
  let service: AuthentificationSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
