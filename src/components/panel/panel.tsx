import React from 'react'
import { StyledPanel } from './styled-panel'

type Props = {
  //
}

export const Panel: React.FC<Props> = ({ children }) => {
  return (
    <StyledPanel>
      {children}
    </StyledPanel>
  )
}