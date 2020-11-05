import React from 'react'
import { StyledCard } from './styled-card'
import { StyledHeader } from './styled-header'
import { StyledFooter } from './styled-footer'
import { StyledGroupName } from './styled-group-name'
import { StyledAvatar, StyledPlaceholder } from './styled-avatar'
import { StyledCardBody } from './styled-card-body'

type Props = {
  name: string | JSX.Element
  avatarUrl?: string | null
  footer?: string | JSX.Element
}

export const Card: React.FC<Props> = ({ name, avatarUrl, footer }) => {
  return (
    <StyledCard>
      {avatarUrl ? (
        <StyledAvatar src={avatarUrl} size={40} />
      ) : (
        <StyledPlaceholder size={40} text={typeof name === 'string' ? name : '?'} />
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