import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';
import axios from 'axios';


export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks')
      dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: e.error
      })
    }
  }
}

export const searchTrack = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
      dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: e.error
      })
    }
  }
}

export const removeTrack = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.delete('http://localhost:5000/tracks/' + id)
      dispatch({type: TrackActionTypes.REMOVE_TRACK, payload: id})
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: e.error
      })
    }
  }
}