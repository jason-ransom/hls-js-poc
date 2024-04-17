import { FC, ReactNode, createContext, useState, useCallback, useEffect } from 'react';
import Hls from 'hls.js';

type HlsContextContainerProps = {
  children: ReactNode;
};

type HlsContextProps = {
  isSupported: boolean;
  attachedVideoElement: HTMLVideoElement | null;
  updateAttachedVideoElement: (attachedVideoElement?: HTMLVideoElement) => void;
};

export const HlsContext = createContext<HlsContextProps>({
  isSupported: false,
  attachedVideoElement: null,
  updateAttachedVideoElement: () => null,
});

const HlsContextContainer: FC<HlsContextContainerProps> = ({ children }) => {
  const [attachedVideoElement, setAttachedVideoElement] = useState<HTMLVideoElement | null>(null);
  const [
    ,
    // hls,
    setHls,
  ] = useState<Hls | null>(null);

  useEffect(() => {
    let hls = null;

    if (attachedVideoElement) {
      hls = new Hls();

      hls.attachMedia(attachedVideoElement);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('attached hls and video');
      });
    }

    setHls(hls);
  }, [attachedVideoElement]);

  const handleUpdateAttachedVideoElement = useCallback(
    (videoElement: HTMLVideoElement | null = null) => {
      setAttachedVideoElement(videoElement);
    },
    [setAttachedVideoElement]
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
      }}
    >
      {children}
    </HlsContext.Provider>
  );
};

export default HlsContextContainer;
