import { baseUrl } from '../app/gitlab'

export const buildUrl = (path: string, base: string = baseUrl): string => {
  if (/^http/.test(path)) {
    return path
  }

  return `${base}/${path}`
}