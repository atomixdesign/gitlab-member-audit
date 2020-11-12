import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedGroup, nonMembersAdapter } from '../../features/groups/groups'
import { Loading } from '../loading/loading'
import { StyledList } from '../list/styled-list'
import { StyledListItem } from '../list/styled-list-item'
import { membersAdapter } from '../../features/members/members'
import { MemberCard } from '../member-card/member-card'
import { Card } from '../card/card'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loadProjects } from '../../features/projects/thunks/load-projects'
import { setIsBulkLoading } from '../../features/projects/projects'

export const MemberList: React.FC = () => {
  const dispatch = useAppDispatch()
  const group = useSelector(getSelectedGroup)
  const isBulkLoading = useAppSelector(state => state.projects.isBulkLoading)
  const loaded = useAppSelector(state => state.projects.loaded)
  const hasNextPage = useAppSelector(state => state.projects.pageInfo?.hasNextPage)
  const page = useAppSelector(state => state.projects.pagesLoaded)
  const items = useAppSelector(state => state.projects.itemsLoaded)
  const loadGroupProjects = () => {
    dispatch(setIsBulkLoading(true))
    dispatch(loadProjects())
  }

  useEffect(() => {
    if (loaded && isBulkLoading) {
      if (hasNextPage) {
        dispatch(loadProjects())
      } else {
        dispatch(setIsBulkLoading(false))
      }
    }
  }, [dispatch, hasNextPage, isBulkLoading, loaded])

  if (group === undefined || group.members === undefined) {
    return null
  }

  const { members, nonMembers } = group
  const { selectAll: selectAllMembers, selectTotal: selectTotalMembers } = membersAdapter.getSelectors()
  const { selectAll: selectAllNonMembers, selectTotal: selectTotalNonMembers } = nonMembersAdapter.getSelectors()

  return members.loading ? <Loading /> : (
    <div>
      <Card name={<h2>{group.name}</h2>} avatarUrl={group.avatarUrl} />

      <h3>Group Members</h3>
      <small>{selectTotalMembers(members)} members</small>

      <StyledList>
        {selectAllMembers(members).map((member) => (
          <StyledListItem key={group.id}>
            <MemberCard member={member} />
          </StyledListItem>
        ))}
      </StyledList>

      {!isBulkLoading && loaded && nonMembers !== undefined ? (
        <>
          <h3>Project Members</h3>
          <small>{selectTotalNonMembers(nonMembers)} members</small>

          <StyledList>
            {selectAllNonMembers(nonMembers).map((member) => (
              <StyledListItem key={group.id}>
                {/*<MemberCard member={member} />*/}
              </StyledListItem>
            ))}
          </StyledList>
        </>
      ) : (
        <button onClick={loadGroupProjects} disabled={isBulkLoading}>
          {isBulkLoading ? (
            `Loading page ${page + 1} (${items} projects loaded)`
          ) : (
             'Load projects'
           )}
        </button>
      )}
    </div>
  )
}