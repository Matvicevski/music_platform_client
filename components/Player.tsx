import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import styles from '../styles/Player.module.scss';
import { ITrack } from '../types/track';
import { Grid } from '@mui/material';
import TrackProgress from './TrackProgress';

const Player: React.FC = () => {

  const active = false;
  const track: ITrack = {
    _id: '1',
    name: 'Track 1',
    artist: 'artist 1',
    text: 'some text',
    listens: '5',
    audio: 'http://localhost:5000/audio/1.mp3',
    picture: 'http://localhost:5000/image/1.jpg',
    comments: []
  };

  return (
    <div className={styles.player}>
      <IconButton onClick={e => e.stopPropagation()}>
        {active
          ? <Pause/>
          : <PlayArrow/>
        }
      </IconButton>
      <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => {}}/>
      <VolumeUp style={{marginLeft: 'auto'}}/>
      <TrackProgress left={0} right={100} onChange={() => {}}/>
    </div>
  );
};

export default Player;