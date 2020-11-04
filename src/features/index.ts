import { reducer as groups } from './groups/groups'
import { reducer as projects } from './projects/projects'
import { reducer as user } from './user/user'
import { reducer as members } from './members/members'

export const reducer = {
  user,
  groups,
  projects,
  members,
}
