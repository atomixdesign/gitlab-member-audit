import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PageInfo } from '../../relay'
import { loadGroups, LoadGroupsPayload } from './thunks'

export type Group = {
  id: string
  name: string
  avatarUrl: string | null
  fullPath: string
}

const groupsAdapter = createEntityAdapter<Group>()

type InitialState = {
  loading: boolean
  loaded: boolean
  pageInfo?: PageInfo
  selected?: string
}

const initialState: InitialState = {
  loading: false,
  loaded: false,
}

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState: groupsAdapter.getInitialState(initialState),
  reducers: {
    setSelectedGroup: (state, action: PayloadAction<string>) => {
      state.selected = action.payload
    },
  },
  extraReducers: {
    [loadGroups.pending.type]: (state) => ({ ...state, loading: true, loaded: false }),
    [loadGroups.rejected.type]: (state, action) => {
      state.loading = false
      state.loaded = false
    },
    [loadGroups.fulfilled.type]: (state, action: PayloadAction<LoadGroupsPayload>) => {
      groupsAdapter.setAll(state, action.payload.nodes)
      state.loading = false
      state.loaded = true
    },
  },
})

export const groupSelector = groupsAdapter.getSelectors<RootState>(state => state.groups)

export const { setSelectedGroup } = actions