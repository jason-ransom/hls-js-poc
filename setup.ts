import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// mock hls.js library globally
vi.mock('hls.js', () => ({
  default: {
    ...vi.importActual('hls.js'),
    isSupported: vi.fn(() => true),
  },
}));

// Clean up after each test
afterEach(() => {
  cleanup();
});
