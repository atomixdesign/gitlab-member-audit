import { createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../../app/apollo'
import { gql } from 'apollo-boost'
import { Group, GroupEntities, GroupWithEntities } from '../groups'
import { Connection, Edge, PageInfo } from '../../../relay'
import { MemberFragment } from '../../members/member-fragment'
import { Member, membersAdapter } from '../../members/members'

const LOAD_GROUPS_QUERY = gql`
    query ($after: String) {
        currentUser {
            groupMemberships(after: $after, first: 50) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        group {
                            id
                            name
                            avatarUrl
                            fullPath
                        }
                    }
                }
            }
        }
    }
`

export type LoadGroupsPayload = {
  pageInfo: PageInfo,
  nodes: Group[]
}

export const loadGroups = createAsyncThunk('groups/loadGroups', async (after: string | undefined): Promise<LoadGroupsPayload> => {
  const { data } = await client.query({
    query: LOAD_GROUPS_QUERY,
    variables: { after },
    errorPolicy: 'ignore',
  })

  const { pageInfo, edges } = data.currentUser.groupMemberships
  const nodes = edges.map((edge: Edge<{ group: Group }>) => edge.node.group)

  return { pageInfo, nodes }
})
