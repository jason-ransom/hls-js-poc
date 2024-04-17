import { render } from '@testing-library/react';
import { describe, expect, it, Mock } from 'vitest';
import Hls from 'hls.js';
import HlsContainer from '../HlsContainer.tsx';

const content = 'content';

describe('HlsContainer', () => {
  it('renders null MediaSource Extensions are not available', () => {
    (Hls.isSupported as Mock).mockReturnValue(false);

    const { queryByText } = render(<HlsContainer>{content}</HlsContainer>);

    expect(queryByText(content)).not.toBeInTheDocument();
  });

  it('renders expected content MediaSource Extensions are available', () => {
    (Hls.isSupported as Mock).mockReturnValue(true);

    const { queryByText } = render(<HlsContainer>{content}</HlsContainer>);

    expect(queryByText(content)).toBeInTheDocument();
  });
});
