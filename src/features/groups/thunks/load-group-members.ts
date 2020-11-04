import { gql } from 'apollo-boost'
import { MemberFragment } from '../../members/member-fragment'
import { client } from '../../../app/apollo'
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { Connection, PageInfo } from '../../../relay'
import { Member } from '../../members/members'
import { RootState, store } from '../../../app/store'
import { groupSelector } from '../groups'

const LOAD_GROUP_MEMBERS_QUERY = gql`
    ${MemberFragment}
    
    query ($path: ID!, $after: String) {
        group(fullPath: $path) {
            groupMembers(first: 100, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        ...MemberFragment
                    }
                }
            }
        }
    }
`

export type LoadGroupMembersPayload = {
    pageInfo: PageInfo
    nodes: Member[]
}

export type LoadGroupMembersInput = {
  after?: string
  id: string
}

export const loadGroupMembers: AsyncThunk<LoadGroupMembersPayload, LoadGroupMembersInput, { state: RootState }> = createAsyncThunk<LoadGroupMembersPayload, LoadGroupMembersInput, { state: RootState }>('groups/loadGroupMembers', async (input: LoadGroupMembersInput, api) => {
    const path = groupSelector.selectById(api.getState(), input.id)?.fullPath

    const variables = {
        after: input.after,
        path,
    }

    const { data } = await client.query({
        query: LOAD_GROUP_MEMBERS_QUERY,
        variables,
        errorPolicy: 'ignore',
    })

    const { pageInfo, edges } = data.group.groupMembers as Connection<Member>
    const nodes = edges.map(edge => edge.node)

    return { pageInfo, nodes }
})