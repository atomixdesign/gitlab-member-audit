import styled from 'styled-components'

export const StyledListItem = styled.li`
  padding: 0.8em 1.6em;
  cursor: pointer;
    
  & + & {
    border-top: 1px solid lightgray;
  }
`