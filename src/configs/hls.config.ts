import Hls, { HlsConfig } from 'hls.js';

// Hls config that can be applied on Hls instance init.
// More details at https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning
export const HLS_CONFIG: HlsConfig = {
  ...Hls.DefaultConfig,
};
