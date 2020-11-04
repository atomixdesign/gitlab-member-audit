import { createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../../app/apollo'
import { gql } from 'apollo-boost'
import { Group } from '../groups'
import { Connection, PageInfo } from '../../../relay'

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
  })

  const groupMemberships: Connection<{ group: Group }> = data.currentUser.groupMemberships
  const { pageInfo, edges } = groupMemberships
  const nodes = edges.map(edge => edge.node.group)

  return { pageInfo, nodes }
})