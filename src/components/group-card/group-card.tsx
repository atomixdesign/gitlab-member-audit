import React from 'react'
import { baseUrl } from '../../app/gitlab'
import { Group } from '../../features/groups/groups'
import { StyledCard } from './styled-card'
import { StyledHeader } from './styled-header'
import { StyledFooter } from './styled-footer'
import { StyledGroupName } from './styled-group-name'
import { StyledAvatar, StyledPlaceholder } from './styled-avatar'
import { StyledCardBody } from './styled-card-body'

type Props = {
  group: Group
}

export const GroupCard: React.FC<Props> = ({ group }) => {
  return (
    <StyledCard>
      {group.avatarUrl ? (
        <StyledAvatar src={group.avatarUrl} size={40} />
      ) : (
        <StyledPlaceholder size={40} text={group.name} />
      )}
      <StyledCardBody>
        <StyledHeader>
          <StyledGroupName>{group.name}</StyledGroupName>
        </StyledHeader>
        <StyledFooter>
          {`${baseUrl}/${group.fullPath}`}
        </StyledFooter>
      </StyledCardBody>
    </StyledCard>
  )
}