import React from 'react'
import { useAppSelector } from './app/store'
import { GroupList } from './components/group-list/group-list'
import { MemberList } from './components/member-list/member-list'

export const App = () => {
  const isAuthenticated = useAppSelector(state => state.user.authenticated)

  return (
    <div>
      {isAuthenticated && (
        <>
          <GroupList />
          <MemberList />
        </>
      )}
    </div>
  )
}

