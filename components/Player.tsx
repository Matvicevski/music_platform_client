import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { Pause, PlayArrow, VolumeOff, VolumeUp } from '@mui/icons-material';
import styles from '../styles/Player.module.scss';
import { Grid } from '@mui/material';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

let audio;

const Player: React.FC = () => {

  const {pause, volume, active, currentTime, duration} = useTypedSelector(state => state.player)
  const {playTrack, pauseTrack, setVolume, setDuration, setCurrentTime, setActiveTrack} = useActions()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    } else {
      setAudio()
      play()
    }
  }, [active])

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const muteUnMuteVolume = (value: number) => {
    setVolume(value)
    audio.volume = value / 100
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  if (!active) {
    return null
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause
          ? <Pause/>
          : <PlayArrow/>
        }
      </IconButton>
      <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
        <div>{active?.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
      {volume
        ? <VolumeUp style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={() => muteUnMuteVolume(0)}/>
        : <VolumeOff style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={() => muteUnMuteVolume(50)}/>
      }
      <TrackProgress left={volume} right={100} onChange={changeVolume}/>
    </div>
  );
};

export default Player;