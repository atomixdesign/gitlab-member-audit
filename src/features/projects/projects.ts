import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type Project = {

}

const projectsAdapter = createEntityAdapter<Project>()

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState: projectsAdapter.getInitialState(),
  reducers: {
    //
  },
})

export const projectSelector = projectsAdapter.getSelectors<RootState>(state => state.projects)
