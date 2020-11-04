import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedGroup } from '../../features/groups/groups'

export const MemberList: React.FC = () => {
  const group = useSelector(getSelectedGroup)

  console.log(group)

  return null
}