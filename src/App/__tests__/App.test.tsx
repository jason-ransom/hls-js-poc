import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '../App.tsx';

describe('App', () => {
  it('renders as expected', () => {
    const { getByText } = render(<App />);

    getByText('HLS.JS POC');
  });
});
