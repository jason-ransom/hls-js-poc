import styled from '@emotion/styled';
import { BORDERS } from '../../styles';

export const VideoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  rowGap: '1em',
  video: {
    border: `solid 2px ${BORDERS.PRIMARY}`,
    borderRadius: 8,
    height: 400,
  },
});

export const ButtonRow = styled('div')({
  display: 'flex',
  width: 100,
  justifyContent: 'center',
  button: {
    width: '100%',
  },
});
