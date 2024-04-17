import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Video from '../Video.tsx';

describe('Video', () => {
  it('renders as expected', () => {
    const { container } = render(<Video />);

    expect(container).toBeTruthy();
  });

  it.todo('test video attaching logic');
});
