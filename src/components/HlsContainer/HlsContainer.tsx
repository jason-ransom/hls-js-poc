import { FC, ReactNode } from 'react';
import Hls from 'hls.js';

type HlsContainerProps = {
  children: ReactNode;
};

const HlsContainer: FC<HlsContainerProps> = ({ children }) => {
  if (!Hls.isSupported()) {
    return null;
  }

  return <div>{children}</div>;
};

export default HlsContainer;
