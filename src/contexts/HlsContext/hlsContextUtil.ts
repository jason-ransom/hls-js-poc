import Hls from 'hls.js';
import { Dispatch, SetStateAction } from 'react';
import { HLS_CONFIG } from '../../configs';

function attachHlsToVideoElement(hls: Hls, attachedVideoElement: HTMLVideoElement) {
  hls.attachMedia(attachedVideoElement);
}

function addMediaAttachedHandler(hls: Hls) {
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    console.log('attached hls and video');
  });
}

export const initAndSetHls = (attachedVideoElement: HTMLVideoElement | null, setHls: Dispatch<SetStateAction<Hls | null>>) => {
  let hls = null;

  if (attachedVideoElement) {
    hls = new Hls(HLS_CONFIG);
    attachHlsToVideoElement(hls, attachedVideoElement);
    addMediaAttachedHandler(hls);
  }

  setHls(hls);
};
