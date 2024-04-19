import Hls from 'hls.js';
import { Dispatch, SetStateAction } from 'react';
import { HLS_CONFIG } from '../../configs';

const attachHlsToVideoElement = (hls: Hls, attachedVideoElement: HTMLVideoElement) => {
  hls.attachMedia(attachedVideoElement);
};

const addMediaAttachedHandler = (hls: Hls) => {
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    console.log('attached hls and video');
  });
};

const addManifestParsedHandler = (hls: Hls) => {
  hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data) {
    console.log('manifest loaded, found ' + data.levels.length + ' quality level');
  });
};

export const initAndSetHls = (attachedVideoElement: HTMLVideoElement | null, setHls: Dispatch<SetStateAction<Hls | null>>) => {
  let hls = null;

  if (attachedVideoElement) {
    hls = new Hls(HLS_CONFIG);
    attachHlsToVideoElement(hls, attachedVideoElement);
    addMediaAttachedHandler(hls);
    addManifestParsedHandler(hls);

    // TODO: Add Error Handling
    // https://github.com/video-dev/hls.js/blob/master/docs/API.md#fifth-step-error-handling
  }

  setHls(hls);
};
