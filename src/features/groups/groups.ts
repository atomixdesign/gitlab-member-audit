import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { Loadable, RootState } from '../../app/store'
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
  members?: EntityState<Member> & Loadable
}

export type GroupWithEntities = Group & GroupEntities

export type GroupWithAllEntities = Group & Required<GroupEntities>

const groupsAdapter = createEntityAdapter<GroupWithEntities>()

export const groupHasEntities = (group: GroupWithEntities): group is GroupWithAllEntities => {
  if (group.members === undefined) {
    return false
  }

  return true
}

type InitialState = Loadable & {
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
  extraReducers: builder => {
    builder
    .addCase(loadGroups.pending, (state) => {
      state.loading = true
      state.loaded = false
    })
    .addCase(loadGroups.rejected, (state, action) => {
      state.loading = false
      state.loaded = false
    })
    .addCase(loadGroups.fulfilled, (state, action) => {
      groupsAdapter.setAll(state, action.payload.nodes)
      state.loading = false
      state.loaded = true
    })
    .addCase(loadGroupMembers.pending, (state, action) => {
      const group = setupGroup(state, action.meta.arg.id)

      group.members.loaded = false
      group.members.loading = true
    })
    .addCase(loadGroupMembers.rejected, (state, action) => {
      const group = setupGroup(state, action.meta.arg.id)

      group.members.loaded = false
      group.members.loading = false
    })
    .addCase(loadGroupMembers.fulfilled, (state, action) => {
      const group = setupGroup(state, action.meta.arg.id)

      group.members.loaded = true
      group.members.loading = false
      group.members.pageInfo = action.payload.pageInfo
      group.members = membersAdapter.upsertMany(group.members, action.payload.nodes)
    })
  },
})

export const groupSelector = groupsAdapter.getSelectors<RootState>(state => state.groups)

export const { setSelectedGroup } = actions

export const getSelectedGroup = (state: RootState): GroupWithEntities | undefined =>
  state.groups.selected
  ? groupSelector.selectById(state, state.groups.selected)
  : undefined

const setupGroup = (state: EntityState<GroupWithEntities>, id: string): GroupWithAllEntities => {
  const group = groupsAdapter.getSelectors().selectById(state, id)

  if (!group) {
    throw new Error('Group not found')
  }

  if (!groupHasEntities(group)) {
    group.members = membersAdapter.getInitialState({
      loaded: false,
      loading: false,
    })
  }

  return group as GroupWithAllEntities
}
