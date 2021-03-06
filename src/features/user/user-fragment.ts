import { gql } from 'apollo-boost'

export const UserFragment = gql`
    fragment UserFragment on User {
        id
        email
        name
        username
        avatarUrl
    }
`
