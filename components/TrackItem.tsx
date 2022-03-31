import React from 'react';
import { ITrack } from '../types/track';
import { Card, Grid } from '@mui/material';
import styles from '../styles/TrackItem.module.scss';
import IconButton from '@mui/material/IconButton';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import { NextThunkDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { removeTrack } from '../store/actions-creators/thunk';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {

  const router = useRouter()
  const {playTrack, pauseTrack, setActiveTrack} = useActions()
  const dispatch = useDispatch() as NextThunkDispatch

  const play = (e) => {
    e.stopPropagation()
    setActiveTrack(track)
    playTrack()
  }

  const deleteTrack = async (e) => {
    e.stopPropagation()
    await dispatch( await removeTrack(track._id))
  }

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={play}>
        {active
          ? <Pause/>
          : <PlayArrow/>
        }
      </IconButton>
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
      <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03:56</div>}
      <IconButton onClick={deleteTrack} style={{marginLeft: 'auto'}}>
        <Delete/>
      </IconButton>
    </Card>
  );
};

export default TrackItem;