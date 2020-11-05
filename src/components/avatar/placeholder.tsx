import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { AvatarProps } from './avatar'
import randomColor from 'randomcolor'
import { makeInitials } from '../../lib/makeInitials'

const StyledPlaceholder = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledPlaceholderInner = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
`

type Props = AvatarProps & {
  text?: string
  initials?: string
}

export const Placeholder: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({ size = 20, initials, text, ...props }) => {
  const seed = String(initials || makeInitials(text)).toUpperCase()

  const color = randomColor({
    luminosity: 'light',
    seed,
  })

  return (
    <StyledPlaceholder { ...props } style={{ width: size, height: size, backgroundColor: color }} role="image">
      <StyledPlaceholderInner>
        {seed}
      </StyledPlaceholderInner>
    </StyledPlaceholder>
  )
}