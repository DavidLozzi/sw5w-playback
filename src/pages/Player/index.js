import React from 'react';
import propTypes from 'prop-types'
import Frame from '../../organisms/Frame'
import ep1 from '../../frames/ep1.json'

import * as Styled from './index.styles'

const Player = ({ episode }) => {
  const frames = React.useRef([]);
  const [currentTime, setCurrentTime] = React.useState({ hour: 0, minute: 0, second: 0 })
  const [intervalId, setIntervalId] = React.useState(null)
  const lastTime = React.useRef({ hour: 0, minute: 0, second: 0, totalSeconds: 0 });
  const screenRef = React.useRef(null)

  const stringifyTime = (time) => {
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}:${time.second.toString().padStart(2, '0')}`
  }
  const startPlayer = () => {
    const id = setInterval(() => {
      setCurrentTime(currTime => {
        const nextTime = {
          second: currTime.second === 59 ? 0 : currTime.second + 1,
          minute: currTime.second === 59 ? currTime.minute + 1 : currTime.minute,
          hour: currTime.second === 59 && currTime.minute === 59 ? currTime.hour + 1 : currTime.hour
        }
        const nextFrame = frames.current.find(f => f.hour === nextTime.hour && f.minute === nextTime.minute && f.second === nextTime.second)
        if (nextFrame) {
          const index = frames.current.indexOf(nextFrame)
          screenRef.current.scrollTo({
            top: index * 640,
            left: 0,
            behavior: 'smooth'
          });
        }
        return nextTime
      })
    }, 1000)
    setIntervalId(id)
  }

  const pausePlayer = () => {
    clearInterval(intervalId)
    setIntervalId(null);
  }

  const renderFrame = React.useCallback((frame, index) => <Frame key={`frame-${frame?.totalSeconds}`} frame={frame} index={index} />, [])


  React.useEffect(() => {
    const sortedFrames = ep1.sort((a, b) => a.totalSeconds > b.totalSeconds ? 1 : -1)
    frames.current = sortedFrames
    lastTime.current = sortedFrames.at(-1)
  }, []);

  return <Styled.Wrapper>
    <Styled.Screen ref={screenRef}>
      { frames.current.map((frame, index) => renderFrame(frame, index))}
    </Styled.Screen>
    <Styled.Timeline>
      {frames.current.map(frame => <Styled.FrameDot frame={frame} totalTime={lastTime.current.totalSeconds} key={`dot-${frame.totalSeconds}`} onClick={() => setCurrentTime(frame)}>
        <Styled.FramePreview frame={frame} />
      </Styled.FrameDot>)}
    </Styled.Timeline>
    <Styled.PlayingDot currentTime={currentTime} totalTime={lastTime.current.totalSeconds} />
    <Styled.Toolbar>
      {!intervalId ?
        <Styled.ActionButton onClick={startPlayer}>&gt; Play</Styled.ActionButton>
        :
        <Styled.ActionButton onClick={pausePlayer}>|| Pause</Styled.ActionButton>
      }
      <Styled.Timer>{stringifyTime(currentTime)} of {stringifyTime(lastTime.current)}</Styled.Timer>
    </Styled.Toolbar>
  </Styled.Wrapper>
}

Player.propTypes = {
  episode: propTypes.string
}

Player.defaultProps = {
  episode: 'ep1'
}

export default Player;