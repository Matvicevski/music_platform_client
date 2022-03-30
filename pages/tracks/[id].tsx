import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';

const TrackPage = () => {

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
  const router = useRouter();

  return (
    <MainLayout>
      <Button
        variant='outlined'
        style={{fontSize: 32}}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <img src={track.picture} alt='track image' width={200} height={200} />
        <div style={{margin: 30}}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Количество прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова к треку</h1>
      <p>{track.text}</p>
      <Grid container>
        <h1>Комментарии</h1>
        <TextField
          label='Ваше имя'
          fullWidth
        />
        <TextField
          label='Комментарий'
          fullWidth
          multiline
          rows={4}
        />
        <Button>Отправить</Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;