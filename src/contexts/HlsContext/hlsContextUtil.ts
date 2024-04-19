import Hls from 'hls.js';
import { Dispatch, SetStateAction } from 'react';

export const initAndSetHls = (attachedVideoElement: HTMLVideoElement | null, setHls: Dispatch<SetStateAction<Hls | null>>) => {
  let hls = null;

  if (attachedVideoElement) {
    hls = new Hls();

    hls.attachMedia(attachedVideoElement);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('attached hls and video');
    });
  }

  setHls(hls);
};
