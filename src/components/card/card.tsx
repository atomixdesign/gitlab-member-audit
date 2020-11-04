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
  name: string
  avatarUrl?: string | null
  footer?: string
}

export const Card: React.FC<Props> = ({ name, avatarUrl, footer }) => {
  return (
    <StyledCard>
      {avatarUrl ? (
        <StyledAvatar src={avatarUrl} size={40} />
      ) : (
        <StyledPlaceholder size={40} text={name} />
      )}
      <StyledCardBody>
        <StyledHeader>
          <StyledGroupName>{name}</StyledGroupName>
        </StyledHeader>
        <StyledFooter>
          {footer}
        </StyledFooter>
      </StyledCardBody>
    </StyledCard>
  )
}