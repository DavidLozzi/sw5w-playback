import React from 'react';
import propTypes from 'prop-types'
import * as Styled from './index.styles'

const Frame = ({ frame, index }) => <Styled.Frame key={`frame-${frame?.totalSeconds}`} frame={frame} index={index} />

Frame.propTypes = {
  frame: propTypes.shape().isRequired,
  index: propTypes.number.isRequired
}

export default React.memo(Frame)