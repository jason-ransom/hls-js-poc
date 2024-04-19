import { BIG_BUCK_BUNNY } from '../../constants';
import { MutableRefObject } from 'react';

export type CreatePlayHandlerProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  sourceLoaded: boolean;
  loadSource: (url: string) => void;
  setSourceLoaded: (value: ((prevState: boolean) => boolean) | boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (value: ((prevState: boolean) => boolean) | boolean) => void;
};
export const createPlayHandler = ({ videoRef, sourceLoaded, loadSource, setSourceLoaded, isPlaying, setIsPlaying }: CreatePlayHandlerProps) => {
  return () => {
    if (!videoRef.current) {
      console.warn('video playing not ready yet.');
      return;
    }

    if (!sourceLoaded) {
      loadSource(BIG_BUCK_BUNNY);
      setSourceLoaded(true);
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    videoRef.current.play();
    setIsPlaying(true);
  };
};
