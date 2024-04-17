import { FC, ReactNode, createContext } from 'react';
import Hls from 'hls.js';

type HlsContextContainerProps = {
  children: ReactNode;
};

const HlsContext = createContext({});

const HlsContextContainer: FC<HlsContextContainerProps> = ({ children }) => {
  if (!Hls.isSupported()) {
    return <div>Error! Media Source Extensions is not available.</div>;
  }

  return <HlsContext.Provider value={{}}>{children}</HlsContext.Provider>;
};

export default HlsContextContainer;
