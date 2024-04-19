import { FC, useContext, useEffect, useRef, useState } from 'react';
import { HlsContext } from '../../contexts/HlsContext';
import { ButtonRow, VideoContainer } from './videoStyles.ts';
import { createPlayHandler } from './videoUtil.ts';

const Video: FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { updateAttachedVideoElement, loadSource } = useContext(HlsContext);
  const [sourceLoaded, setSourceLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      updateAttachedVideoElement(videoRef.current);
    }
  }, [updateAttachedVideoElement]);

  const handlePlay = createPlayHandler({
    videoRef,
    sourceLoaded,
    loadSource,
    setSourceLoaded,
    isPlaying,
    setIsPlaying,
  });

  return (
    <VideoContainer>
      <video ref={videoRef}></video>
      <ButtonRow>
        <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      </ButtonRow>
    </VideoContainer>
  );
};

export default Video;
