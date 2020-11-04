import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { PageInfo } from '../../relay'
import { loadGroups, LoadGroupsPayload } from './thunks'
import { Member, membersAdapter } from '../members/members'
import { loadGroupMembers, LoadGroupMembersInput, LoadGroupMembersPayload } from './thunks/load-group-members'

export type Group = {
  id: string
  name: string
  avatarUrl: string | null
  fullPath: string
}

export type GroupEntities = {
  members?: EntityState<Member> & {
    pageInfo?: PageInfo
    selected?: string
  }
}

export type GroupWithEntities = Group & GroupEntities

const groupsAdapter = createEntityAdapter<GroupWithEntities>()

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
      console.error(action.error.message)
      state.loading = false
      state.loaded = false
    },
    [loadGroups.fulfilled.type]: (state, action: PayloadAction<LoadGroupsPayload>) => {
      groupsAdapter.setAll(state, action.payload.nodes)
      state.loading = false
      state.loaded = true
    },
    [loadGroupMembers.pending.type]: (state) => ({ ...state, loading: true }),
    [loadGroupMembers.rejected.type]: (state, action) => {
      console.error(action.error.message)
      state.loading = false
    },
    [loadGroupMembers.fulfilled.type]: (state, action: PayloadAction<LoadGroupMembersPayload, string, { arg: LoadGroupMembersInput }>) => {
      state.loading = false
      const group = groupsAdapter.getSelectors().selectById(state, action.meta.arg.id)

      if (!group) {
        throw new Error('Group not found')
      }

      if (!group.members) {
        group.members = membersAdapter.getInitialState()
      }

      group.members.pageInfo = action.payload.pageInfo
      group.members = membersAdapter.upsertMany(group.members, action.payload.nodes)
    },
  },
})

export const groupSelector = groupsAdapter.getSelectors<RootState>(state => state.groups)

export const { setSelectedGroup } = actions

export const getSelectedGroup = (state: RootState): Group | undefined =>
  state.groups.selected
  ? groupSelector.selectById(state, state.groups.selected)
  : undefined