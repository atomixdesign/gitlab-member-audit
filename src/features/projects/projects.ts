import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { Loadable, RootState } from '../../app/store'
import { Member } from '../members/members'
import { Group, setSelectedGroup } from '../groups/groups'
import { loadProjects } from './thunks/load-projects'
import { Connection } from '../../relay'

export type Project = {
  id: string
  name: string
  group: Pick<Group, 'id'>
  projectMembers: Connection<Member>
}

type InitialState = Loadable & {
  pagesLoaded: number
  itemsLoaded: number
}

const initialState: InitialState = {
  loading: false,
  loaded: false,
  pagesLoaded: 0,
  itemsLoaded: 0,
}

const projectsAdapter = createEntityAdapter<Project>()

const freshState = () => projectsAdapter.getInitialState(initialState)

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState: freshState(),
  reducers: {
    setIsBulkLoading: (state, action: PayloadAction<boolean>) => {
      state.isBulkLoading = action.payload
    },
  },
  extraReducers: builder =>
    builder
    .addCase(loadProjects.pending, (state) => {
      state.loaded = false
      state.loading = true
      state.error = undefined
    })
    .addCase(loadProjects.rejected, (state, action) => {
      state.loaded = false
      state.loaded = false
      state.error = action.error.message
    })
    .addCase(loadProjects.fulfilled, (state, action) => {
      state.loaded = true
      state.loading = false
      projectsAdapter.upsertMany(state, action.payload.nodes)
      state.pageInfo = action.payload.pageInfo
      state.pagesLoaded += 1
      state.itemsLoaded += action.payload.nodes.length
    })
    .addCase(setSelectedGroup, _ => {
      return freshState()
    })
})

export const projectSelector = projectsAdapter.getSelectors<RootState>(state => state.projects)

export const { setIsBulkLoading } = actions