import { render } from '@testing-library/react';
import { describe, expect, it, vi, Mock } from 'vitest';
import Hls from 'hls.js';
import HlsContainer from '../HlsContainer.tsx';

vi.mock('hls.js', () => ({
  default: {
    ...vi.importActual('hls.js'),
    isSupported: vi.fn(),
  },
}));

const content = 'content';

describe('HlsContainer', () => {
  it('renders null MediaSource Extensions are not available', () => {
    (Hls.isSupported as Mock).mockReturnValue(false);

    const { queryByText } = render(<HlsContainer>{content}</HlsContainer>);

    expect(queryByText(content)).not.toBeTruthy();
  });

  it('renders expected content MediaSource Extensions are available', () => {
    (Hls.isSupported as Mock).mockReturnValue(true);

    const { queryByText } = render(<HlsContainer>{content}</HlsContainer>);

    expect(queryByText(content)).toBeTruthy();
  });
});
