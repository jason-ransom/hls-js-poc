import { render } from '@testing-library/react';
import { describe, expect, it, Mock } from 'vitest';
import Hls from 'hls.js';
import HlsContext from '../HlsContext.tsx';

const EXPECTED_ERROR_MESSAGE = 'Error! Media Source Extensions is not available.';
const CONTENT = 'content';

describe('HlsContext', () => {
  it('renders error message when MediaSource Extensions are not available', () => {
    (Hls.isSupported as Mock).mockReturnValue(false);

    const { queryByText } = render(<HlsContext>{CONTENT}</HlsContext>);

    expect(queryByText(EXPECTED_ERROR_MESSAGE)).toBeInTheDocument();
    expect(queryByText(CONTENT)).not.toBeInTheDocument();
  });

  it('renders expected content MediaSource Extensions are available', () => {
    (Hls.isSupported as Mock).mockReturnValue(true);

    const { queryByText } = render(<HlsContext>{CONTENT}</HlsContext>);

    expect(queryByText(EXPECTED_ERROR_MESSAGE)).not.toBeInTheDocument();
    expect(queryByText(CONTENT)).toBeInTheDocument();
  });

  it.todo('instantiates HLS and binds it to video when available');
});
