import styled, { css } from 'styled-components'
import { Avatar } from '../avatar/avatar'
import { Placeholder } from '../avatar/placeholder'

const styles = css`
  flex: 0 0 auto;
  margin-right: 1em;
`

export const StyledAvatar = styled(Avatar)`
  ${styles};
`

export const StyledPlaceholder = styled(Placeholder)`
  ${styles};
`