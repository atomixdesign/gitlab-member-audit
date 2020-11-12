import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { User } from '../user/user'

export type Member = {
  id: string
  user: User
  accessLevel: {
    stringValue: string
  }
}

export const membersAdapter = createEntityAdapter<Member>()

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState: membersAdapter.getInitialState(),
  reducers: {
    //
  },
})

export const MemberSelector = membersAdapter.getSelectors<RootState>(state => state.members)
