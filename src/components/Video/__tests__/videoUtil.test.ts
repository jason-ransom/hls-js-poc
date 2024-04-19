import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPlayHandler, CreatePlayHandlerProps } from '../videoUtil.ts';
import { BIG_BUCK_BUNNY } from '../../../constants';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('videoUtil', () => {
  describe('createPlayHandler', () => {
    const DEFAULT_PLAY_HANDLER_PROPS: CreatePlayHandlerProps = {
      videoRef: { current: { ...document.createElement('video'), pause: vi.fn(), play: vi.fn() } },
      sourceLoaded: true,
      loadSource: vi.fn(),
      setSourceLoaded: vi.fn(),
      isPlaying: false,
      setIsPlaying: vi.fn(),
    };

    const callPlayHandler = (overrides: Partial<CreatePlayHandlerProps> = {}) => {
      createPlayHandler({
        ...DEFAULT_PLAY_HANDLER_PROPS,
        ...overrides,
      })();
    };

    const createsFunctionThat = (name: string) => `creates function that ${name}`;

    describe('when video element is falsy', () => {
      it(createsFunctionThat('logs warning'), () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn');

        callPlayHandler({
          videoRef: { current: null },
        });

        expect(consoleWarnSpy).toHaveBeenCalledWith('video playing not ready yet.');
      });
    });

    describe('when video element is truthy', () => {
      it(createsFunctionThat('loads expected source when not already loaded'), () => {
        callPlayHandler({
          sourceLoaded: false,
        });

        expect(DEFAULT_PLAY_HANDLER_PROPS.loadSource).toHaveBeenCalledWith(BIG_BUCK_BUNNY);
        expect(DEFAULT_PLAY_HANDLER_PROPS.setSourceLoaded).toHaveBeenCalledWith(true);
      });

      it(createsFunctionThat('does not load source when source already loaded'), () => {
        callPlayHandler();

        expect(DEFAULT_PLAY_HANDLER_PROPS.loadSource).not.toHaveBeenCalled();
        expect(DEFAULT_PLAY_HANDLER_PROPS.setSourceLoaded).not.toHaveBeenCalled();
      });

      it(createsFunctionThat('pauses video when it is playing'), () => {
        callPlayHandler({
          isPlaying: true,
        });

        expect(DEFAULT_PLAY_HANDLER_PROPS.videoRef.current!.pause).toHaveBeenCalled();
        expect(DEFAULT_PLAY_HANDLER_PROPS.setIsPlaying).toHaveBeenCalledWith(false);
        expect(DEFAULT_PLAY_HANDLER_PROPS.videoRef.current!.play).not.toHaveBeenCalled();
      });

      it(createsFunctionThat('plays video when it is paused'), () => {
        callPlayHandler();

        expect(DEFAULT_PLAY_HANDLER_PROPS.videoRef.current!.pause).not.toHaveBeenCalled();
        expect(DEFAULT_PLAY_HANDLER_PROPS.setIsPlaying).toHaveBeenCalledWith(true);
        expect(DEFAULT_PLAY_HANDLER_PROPS.videoRef.current!.play).toHaveBeenCalled();
      });
    });
  });
});
