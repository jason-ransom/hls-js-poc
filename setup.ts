import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// mock hls.js library globally
class MockHljs {
  constructor() {}

  static Events = {
    MEDIA_ATTACHED: 'MEDIA_ATTACHED',
  };
  static isSupported = vi.fn(() => true);

  attachMedia = vi.fn();
  on = vi.fn();
}
vi.mock('hls.js', () => ({
  default: MockHljs,
}));

// Clean up after each test
afterEach(() => {
  cleanup();
});
