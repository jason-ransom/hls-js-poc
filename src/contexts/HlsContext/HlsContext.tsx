import { FC, ReactNode, createContext, useState } from 'react';
import Hls from 'hls.js';

type HlsContextContainerProps = {
  children: ReactNode;
};

type HlsContextProps = {
  isSupported: boolean;
  attachedVideoElement: HTMLVideoElement | null;
  updateAttachedVideoElement: (attachedVideoElement?: HTMLVideoElement) => void;
};

const HlsContext = createContext<HlsContextProps>({
  isSupported: false,
  attachedVideoElement: null,
  updateAttachedVideoElement: () => null,
});

const HlsContextContainer: FC<HlsContextContainerProps> = ({ children }) => {
  const [attachedVideoElement, setAttachedVideoElement] = useState<HTMLVideoElement | null>(null);

  const handleUpdateAttachedVideoElement = (videoElement: HTMLVideoElement | null = null) => {
    setAttachedVideoElement(videoElement);
  };

  if (!Hls.isSupported()) {
    return <div>Error! Media Source Extensions is not available.</div>;
  }

  return (
    <HlsContext.Provider
      value={{
        isSupported: Hls.isSupported(),
        attachedVideoElement,
        updateAttachedVideoElement: handleUpdateAttachedVideoElement,
      }}
    >
      {children}
    </HlsContext.Provider>
  );
};

export default HlsContextContainer;
