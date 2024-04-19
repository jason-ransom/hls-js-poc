import { FC, useContext, useEffect, useRef } from 'react';
import { HlsContext } from '../../contexts/HlsContext';
import { BIG_BUCK_BUNNY } from '../../constants';

interface VideoProps {}

const Video: FC<VideoProps> = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { updateAttachedVideoElement, loadSource } = useContext(HlsContext);

  useEffect(() => {
    if (videoRef.current) {
      updateAttachedVideoElement(videoRef.current);
    }
  }, [updateAttachedVideoElement]);

  const handlePlay = () => {
    if (!videoRef.current) {
      console.log('video playing not ready yet.');
      return;
    }

    loadSource(BIG_BUCK_BUNNY);
    videoRef.current.play();
  };

  return (
    <div>
      <video ref={videoRef}></video>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default Video;
