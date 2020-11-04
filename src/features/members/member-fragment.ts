import { gql } from 'apollo-boost'
import { UserFragment } from '../user/user-fragment'

export const MemberFragment = gql`
    ${UserFragment}

    fragment MemberFragment on MemberInterface {
        id
        accessLevel {
            stringValue
        }
        user {
            ...UserFragment
        }
    }
`

