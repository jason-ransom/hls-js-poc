import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Video from '../Video.tsx';

describe('Video', () => {
  describe('rendering', () => {
    it('renders as expected', () => {
      const { container } = render(<Video />);

      expect(container).toBeTruthy();
    });

    it.todo('renders play button when video is is paused');

    it.todo('renders pause button when video is is playing');
  });

  it.todo('test video attaching logic');
});
