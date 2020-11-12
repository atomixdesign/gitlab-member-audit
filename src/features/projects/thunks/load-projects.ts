import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { Edge, PageInfo } from '../../../relay'
import { Project } from '../projects'
import { gql } from 'apollo-boost'
import { client } from '../../../app/apollo'
import { RootState } from '../../../app/store'
import { groupSelector } from '../../groups/groups'
import { MemberFragment } from '../../members/member-fragment'

const LOAD_PROJECTS_QUERY = gql`
    ${MemberFragment}
    
    query ($path: ID!, $after: String) {
        group(fullPath: $path) {
            name
            projects(after: $after, first: 100, includeSubgroups: true) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        id
                        group {
                            id
                        }
                        name
                        projectMembers(first: 100) {
                            edges {
                                node {
                                    ...MemberFragment
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export type LoadProjectsPayload = {
  pageInfo: PageInfo,
  nodes: Project[]
}

export const loadProjects: AsyncThunk<LoadProjectsPayload, undefined, { state: RootState }> = createAsyncThunk('projects/loadProjects', async (_, api) => {
    const state = api.getState()
    const id = state.groups.selected
    const after = state.projects.pageInfo?.endCursor

    if (id === undefined) {
        throw new Error('No group found')
    }

    const path = groupSelector.selectById(state, id)?.fullPath

    const { data } = await client.query({
        query: LOAD_PROJECTS_QUERY,
        variables: { after, path },
        errorPolicy: 'ignore',
    })

    const { pageInfo, edges } = data.group.projects
    const nodes = edges.map((edge: Edge<Project>) => edge.node)

    return { pageInfo, nodes }
})