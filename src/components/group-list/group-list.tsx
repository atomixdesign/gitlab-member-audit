import React, { useEffect, useMemo } from 'react'
import { Group, groupSelector, setSelectedGroup } from '../../features/groups/groups'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loadGroups } from '../../features/groups/thunks'
import { Loading } from '../loading/loading'
import { StyledList } from '../list/styled-list'
import { StyledListItem } from '../list/styled-list-item'
import { GroupCard } from '../group-card/group-card'
import { loadGroupMembers } from '../../features/groups/thunks/load-group-members'
import { Card } from '../card/card'

export const GroupList: React.FC = () => {
  const loaded = useAppSelector(state => state.groups.loaded)
  const loading = useAppSelector(state => state.groups.loading)
  const groups = useAppSelector(groupSelector.selectAll)
  const selectedGroup = useAppSelector(state => state.groups.selected)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!loaded) {
      dispatch(loadGroups())
    }
  }, [dispatch, loaded])

  const onClick = useMemo(() => (group: Group) => {
    dispatch(setSelectedGroup(group.id))
    dispatch(loadGroupMembers({ id: group.id }))
  }, [dispatch])

  return loading ? <Loading /> : (
    <div>
      <Card name={<h2>Groups</h2>} />

      <h3>All groups</h3>
      <small>{groups.length} groups</small>

      <StyledList>
        {groups.map((group) => (
          <StyledListItem key={group.id} role="radio" aria-checked={selectedGroup === group.id} onClick={onClick.bind(null, group)}>
            <GroupCard group={group} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  )

}