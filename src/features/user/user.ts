import { createSlice } from '@reduxjs/toolkit'

export type User = {
  id: string
  email: string
  name: string
  username: string
  avatarUrl: string
}

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