import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { Loadable, RootState } from '../../app/store'
import { PageInfo } from '../../relay'
import { loadGroups, LoadGroupsPayload } from './thunks'
import { Member, membersAdapter } from '../members/members'
import { loadGroupMembers, LoadGroupMembersInput, LoadGroupMembersPayload } from './thunks/load-group-members'
import { setIsBulkLoading } from '../projects/projects'
import { loadProjects } from '../projects/thunks/load-projects'
import { User } from '../user/user'

export type Group = {
  id: string
  name: string
  avatarUrl: string | null
  fullPath: string
}

type ProjectMembership = {
  id: string
  accessLevel: Member["accessLevel"]
}

type UserWithMemberships = User & {
  memberships: EntityState<ProjectMembership>
}

export type GroupEntities = {
  members?: EntityState<Member> & Loadable
  nonMembers?: EntityState<UserWithMemberships>
}

export type GroupWithEntities = Group & GroupEntities

export type GroupWithAllEntities = Group & Required<GroupEntities>

const groupsAdapter = createEntityAdapter<GroupWithEntities>()

export const groupHasEntities = (group: GroupWithEntities): group is GroupWithAllEntities => {
  if (group.members === undefined) {
    return false
  }

  if (group.nonMembers === undefined) {
    return false
  }

  return true
}

type InitialState = Loadable & {
  pageInfo?: PageInfo
  selected?: string
}

export const nonMembersAdapter = createEntityAdapter<UserWithMemberships>()

export const projectMembershipAdapter = createEntityAdapter<ProjectMembership>()

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
    .addCase(loadProjects.fulfilled, (state, action) => {
      if (action.payload.nodes.length > 0 && state.selected) {
        const group = setupGroup(state, state.selected)
        const projects = action.payload.nodes
        const memberIds = membersAdapter.getSelectors().selectIds(group.members)

        projects.forEach((project) => {
          project.projectMembers.edges.forEach((edge) => {
            const member = edge.node

            if (memberIds.includes(member.id)) {
              return
            }

            const existingUser = nonMembersAdapter.getSelectors().selectById(group.nonMembers, member.user.id)
            if (existingUser) {
              nonMembersAdapter.updateOne(group.nonMembers, {
                id: member.user.id,
                changes: {
                  memberships: projectMembershipAdapter.upsertOne(existingUser.memberships, {
                    id: project.id,
                    accessLevel: member.accessLevel,
                  })
                }
              })
            } else {
              const newMember: UserWithMemberships = {
                ...member.user,
                memberships: projectMembershipAdapter.getInitialState()
              }

              projectMembershipAdapter.setAll(newMember.memberships, [
                {
                  id: project.id,
                  accessLevel: member.accessLevel,
                }
              ])

              nonMembersAdapter.upsertOne(group.nonMembers, newMember)
            }
          })
        })
      }
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

    group.nonMembers = nonMembersAdapter.getInitialState()
  }

  return group as GroupWithAllEntities
}
