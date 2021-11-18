import React from 'react';
import propTypes from 'prop-types'
import * as Styled from './index.styles'

const Screen = ({ children }) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>
}

Screen.propTypes = {
  children: propTypes.array.isRequired
}

export default React.memo(Screen)