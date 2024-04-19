import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// mock hls.js library globally
export const mockHljsConstructor = vi.fn();
export const mockAttachMedia = vi.fn();
export const mockOn = vi.fn();
export class MockHljs {
  constructor() {
    mockHljsConstructor();
  }

  static Events = {
    MEDIA_ATTACHED: 'MEDIA_ATTACHED',
  };
  static isSupported = vi.fn(() => true);

  attachMedia = mockAttachMedia;
  on = mockOn;
}
vi.mock('hls.js', () => ({
  default: MockHljs,
}));

// Clean up after each test
afterEach(() => {
  cleanup();
});
