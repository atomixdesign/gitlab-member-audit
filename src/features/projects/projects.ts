import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Member } from '../members/members'

export type Project = {
  members: EntityState<Member>[]
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
