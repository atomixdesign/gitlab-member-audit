import styled from 'styled-components'

export const StyledPanel = styled.div`
  resize: horizontal;
  height: 100%;
  overflow-y: scroll;
  border: 2px solid;
  padding: 0 20px;
  margin: 0 20px;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`