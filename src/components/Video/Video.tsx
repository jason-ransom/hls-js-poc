import { FC, useContext, useEffect, useRef } from 'react';
import { HlsContext } from '../../contexts/HlsContext';

interface VideoProps {}

const Video: FC<VideoProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { updateAttachedVideoElement } = useContext(HlsContext);

  useEffect(() => {
    if (videoRef.current) {
      updateAttachedVideoElement(videoRef.current);
    }
  }, [updateAttachedVideoElement]);

  return <video ref={videoRef}></video>;
};

export default Video;
