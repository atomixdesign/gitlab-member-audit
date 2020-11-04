import React, { useEffect } from 'react'
import { groupSelector, setSelectedGroup } from '../../features/groups/groups'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { loadGroups } from '../../features/groups/thunks'
import { Loading } from '../loading/loading'
import { GroupCard } from '../group-card/group-card'
import { StyledList } from './styled-list'
import { StyledListItem } from './styled-list-item'

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

  return loading ? <Loading /> : (
    <div>
      <h2>Groups</h2>

      <StyledList>
        {groups.map((group) => (
          <StyledListItem key={group.id} role="radio" aria-checked={selectedGroup === group.id} onClick={() => dispatch(setSelectedGroup(group.id))}>
            <GroupCard group={group} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  )

}