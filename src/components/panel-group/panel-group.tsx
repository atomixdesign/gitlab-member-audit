import React from 'react'
import { StyledPanelGroup } from './styled-panel-group'

type Props = {
  children: JSX.Element[]
}

export const PanelGroup: React.FC<Props> = ({ children }) => {
  return (
    <StyledPanelGroup>
      {children}
    </StyledPanelGroup>
  )
}