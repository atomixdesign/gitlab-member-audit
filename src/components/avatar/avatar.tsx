import React, { ImgHTMLAttributes } from 'react'
import styled from 'styled-components'

export type AvatarProps = {
  size?: number
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'src'> & AvatarProps & {
  src: string | null
}

const StyledImage = styled.img`
  border-radius: 50%;
`

export const Avatar: React.FC<Props> = ({ src, size = 20, ...props }) => {
  if (typeof src !== 'string') {
    return null
  }

  return (
    <StyledImage src={src} height={size} width={size} { ...props }  alt={props.alt || ''}/>
  )
}