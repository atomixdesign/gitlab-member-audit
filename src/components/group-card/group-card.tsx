import { Group } from '../../features/groups/groups'
import React from 'react'
import { Card } from '../card/card'
import { baseUrl } from '../../app/gitlab'

type Props = {
  group: Group
}

export const GroupCard: React.FC<Props> = ({ group }) => {
  return <Card name={group.name} avatarUrl={group.avatarUrl} footer={`${baseUrl}/${group.fullPath}`} />
}
