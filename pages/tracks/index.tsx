import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';

const Tracks = () => {

  const router = useRouter();
  const tracks: ITrack[] = [
    {_id: '1', name: 'Track 1', artist: 'artist 1', text: 'some text', listens: '5', audio: 'http://localhost:5000/audio/1.mp3', picture: 'http://localhost:5000/image/1.jpg', comments: []},
    {_id: '2', name: 'Track 2', artist: 'artist 2', text: 'some text', listens: '2', audio: 'http://localhost:5000/audio/2.mp3', picture: 'http://localhost:5000/image/2.jpg', comments: []},
    {_id: '3', name: 'Track 3', artist: 'artist 3', text: 'some text', listens: '3', audio: 'http://localhost:5000/audio/3.mp3', picture: 'http://localhost:5000/image/3.jpg', comments: []},
    {_id: '4', name: 'Track 4', artist: 'artist 4', text: 'some text', listens: '4', audio: 'http://localhost:5000/audio/4.mp3', picture: 'http://localhost:5000/image/4.jpg', comments: []},
  ];

  return (
    <MainLayout>
      <Grid container justifyContent='center'>
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;