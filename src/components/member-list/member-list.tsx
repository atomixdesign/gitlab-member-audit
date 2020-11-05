import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedGroup } from '../../features/groups/groups'
import { Loading } from '../loading/loading'
import { StyledList } from '../list/styled-list'
import { StyledListItem } from '../list/styled-list-item'
import { membersAdapter } from '../../features/members/members'
import { MemberCard } from '../member-card/member-card'
import { Avatar } from '../avatar/avatar'
import { Card } from '../card/card'

export const MemberList: React.FC = () => {
  const group = useSelector(getSelectedGroup)

  if (group === undefined || group.members === undefined) {
    return null
  }

  const { members } = group
  const { selectAll, selectTotal } = membersAdapter.getSelectors()

  return members.loading ? <Loading /> : (
    <div>
      <Card name={<h2>{group.name}</h2>} avatarUrl={group.avatarUrl} />

      <h3>Group Members</h3>
      <small>{selectTotal(members)} members</small>

      <StyledList>
        {selectAll(members).map((member) => (
          <StyledListItem key={group.id}>
            <MemberCard member={member} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  )
}