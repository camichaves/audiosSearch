import { TestBed } from '@angular/core/testing';

import { AudiosService } from './audios.service';

describe('AudiosService', () => {
  let service: AudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
