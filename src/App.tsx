import React from 'react'
import { useAppSelector } from './app/store'
import { GroupList } from './components/group-list/group-list'
import { MemberList } from './components/member-list/member-list'
import { PanelGroup } from './components/panel-group/panel-group'
import { Panel } from './components/panel/panel'

export const App = () => {
  const isAuthenticated = useAppSelector(state => state.user.authenticated)

  return (
    <div>
      {isAuthenticated && (
        <PanelGroup>
          <Panel>
            <GroupList />
          </Panel>
          <Panel>
            <MemberList />
          </Panel>
        </PanelGroup>
      )}
    </div>
  )
}

