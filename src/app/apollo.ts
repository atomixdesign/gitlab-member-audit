import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { store } from './store'
import { baseUrl } from './gitlab'

export const client = new ApolloClient({
  uri: `${baseUrl}/api/graphql`,
  cache: new InMemoryCache(),
  request: (operation) => {
    const token = store.getState().user.token

    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    }
  },
})