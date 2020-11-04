export const makeInitials = (text?: string, limit: number = 2) => {
  if (!text) {
    return '?'
  }

  return text.split(' ').slice(0, limit).map(w => w.charAt(0)).join('')
}