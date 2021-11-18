import styled from 'styled-components'


export const Frame = styled(({ frame, ...rest }) => <div {...rest} />)`
  width: 100%;
  height: 40rem;
  background-image: url(${ ({ frame }) => frame.file });
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`
