import { render } from '@testing-library/react';
import { describe, expect, it, Mock } from 'vitest';
import Hls from 'hls.js';
import HlsContextContainer, { HlsContext } from '../HlsContext.tsx';
import { useContext, useEffect } from 'react';
import { mockAttachMedia, mockHljsConstructor } from '../../../../setup.ts';

const EXPECTED_ERROR_MESSAGE = 'Error! Media Source Extensions is not available.';
const CONTENT = 'content';

const videoElement = document.createElement('video');
const TestComponent = () => {
  const { updateAttachedVideoElement } = useContext(HlsContext);

  useEffect(() => {
    updateAttachedVideoElement(videoElement);
  }, [updateAttachedVideoElement]);

  return null;
};

describe('HlsContext', () => {
  it('renders error message when MediaSource Extensions are not available', () => {
    (Hls.isSupported as Mock).mockReturnValue(false);

    const { queryByText } = render(<HlsContextContainer>{CONTENT}</HlsContextContainer>);

    expect(queryByText(EXPECTED_ERROR_MESSAGE)).toBeInTheDocument();
    expect(queryByText(CONTENT)).not.toBeInTheDocument();
  });

  it('renders expected content MediaSource Extensions are available', () => {
    (Hls.isSupported as Mock).mockReturnValue(true);

    const { queryByText } = render(<HlsContextContainer>{CONTENT}</HlsContextContainer>);

    expect(queryByText(EXPECTED_ERROR_MESSAGE)).not.toBeInTheDocument();
    expect(queryByText(CONTENT)).toBeInTheDocument();
  });

  it('instantiates HLS and binds it to video when available', () => {
    render(
      <HlsContextContainer>
        <TestComponent />
      </HlsContextContainer>
    );

    // confirm mocked Hljs instance was created
    expect(mockHljsConstructor).toHaveBeenCalledTimes(1);

    // confirm video element attached
    expect(mockAttachMedia).toHaveBeenCalledWith(videoElement);
  });
});
