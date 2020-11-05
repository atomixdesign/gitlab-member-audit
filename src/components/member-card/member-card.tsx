import React from 'react'
import { Member } from '../../features/members/members'
import { Card } from '../card/card'
import { buildUrl } from '../../lib/buildUrl'
import { StyledBadge } from './styled-badge'
import randomColor from 'randomcolor'

type Props = {
  member: Member
}

export const MemberCard: React.FC<Props> = ({ member }) => {
  const color = randomColor({
    seed: member.accessLevel.stringValue,
    luminosity: 'light',
  })

  return (
    <Card
      name={(
        <>
          {member.user.name}
          {' '}
          <StyledBadge style={{ backgroundColor: color }}>
            {member.accessLevel.stringValue}
          </StyledBadge>
        </>
      )}
      footer={member.user.email}
      avatarUrl={buildUrl(member.user.avatarUrl)}
    />
  )
}
