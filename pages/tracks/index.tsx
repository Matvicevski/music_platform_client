import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTrack } from '../../store/actions-creators/thunk';
import { useDispatch } from 'react-redux';

const Tracks = () => {

  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.tracks)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTrack(e.target.value))
      }, 500)
    )
  }

  if (error) {
    return (
      <MainLayout>
        <h3>{error}</h3>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Список трэков - музыкальная платформа'}>
      <Grid container justifyContent="center">
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
            </Grid>
          </Box>
          <TextField
            label="Поиск по названию трека"
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Tracks;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks())
})
