import { FC, ReactNode, createContext, useState, useCallback, useEffect } from 'react';
import Hls from 'hls.js';
import { initAndSetHls } from './hlsContextUtil.ts';

type HlsContextContainerProps = {
  children: ReactNode;
};

type HlsContextProps = {
  isSupported: boolean;
  attachedVideoElement: HTMLVideoElement | null;
  updateAttachedVideoElement: (attachedVideoElement?: HTMLVideoElement) => void;
  loadSource: (url: string) => void;
};

export const HlsContext = createContext<HlsContextProps>({
  isSupported: false,
  attachedVideoElement: null,
  updateAttachedVideoElement: () => null,
  loadSource: () => null,
});

const HlsContextContainer: FC<HlsContextContainerProps> = ({ children }) => {
  const [attachedVideoElement, setAttachedVideoElement] = useState<HTMLVideoElement | null>(null);
  const [hls, setHls] = useState<Hls | null>(null);

  useEffect(() => {
    initAndSetHls(attachedVideoElement, setHls);
  }, [attachedVideoElement]);

  const handleUpdateAttachedVideoElement = useCallback(
    (videoElement: HTMLVideoElement | null = null) => {
      setAttachedVideoElement(videoElement);
    },
    [setAttachedVideoElement]
  );

  const handleLoadSource = useCallback(
    (url: string) => {
      if (hls && attachedVideoElement) {
        hls.loadSource(url);
        hls.attachMedia(attachedVideoElement);
      }
    },
    [hls, attachedVideoElement]
  );

  if (!Hls.isSupported()) {
    return <div>Error! Media Source Extensions is not available.</div>;
  }

  return (
    <HlsContext.Provider
      value={{
        isSupported: Hls.isSupported(),
        attachedVideoElement,
        updateAttachedVideoElement: handleUpdateAttachedVideoElement,
        loadSource: handleLoadSource,
      }}
    >
      {children}
    </HlsContext.Provider>
  );
};

export default HlsContextContainer;
