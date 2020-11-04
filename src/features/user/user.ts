import { createSlice } from '@reduxjs/toolkit'

export const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {
    authenticated: true,
    token: process.env.REACT_APP_GITLAB_TOKEN,
  },
  reducers: {
    //
  },
})