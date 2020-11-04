export type Node<T> = T

export type Edge<T> = {
  cursor: string,
  node: Node<T>
}

export type PageInfo = {
  startCursor?: string
  endCursor?: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export type Connection<T> = {
  pageInfo: PageInfo
  edges: Edge<T>[]
  nodes: Node<T>[]
}