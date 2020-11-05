import React, { HTMLAttributes } from 'react'
import { StyledBadge } from './styled-badge'

export const Badge: React.FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <StyledBadge { ...props }>
      {children}
    </StyledBadge>
  )
}