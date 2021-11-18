import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 40rem;
  background-color: #313131;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: industry, sans-serif;
`

export const FramePreview = styled(({ frame, ...rest }) => <div {...rest} />)`
  display: none;
  width: 20rem;
  height: 8rem;
  background-image: url(${({frame}) => frame.file});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  top: -8.5rem;
  left: -10rem;
`
export const Screen = styled.div`
  width: 100%;
  height: 40rem;
  position: relative;
  overflow: hidden;
`

export const FrameDot = styled(({ frame, totalTime, ...rest }) => <div {...rest} />)`
  position: relative;
  left: ${({ totalTime, frame }) => (frame.totalSeconds * 90) / totalTime}%;
  background-color: #ffffff;
  border-radius: .2rem;
  height: .4rem;
  width: .4rem;
  cursor: pointer;

  :hover {
    ${FramePreview} {
      display: block;
    }
  }
`

export const Timeline = styled.div`
  height: .5rem;
  width: 100%;
  background-color: #888888;
  display: flex;
  align-content: center;
  align-items: center;

  :first-child {
    left: -.2rem;
  }
`

export const PlayingDot = styled(({ currentTime, totalTime, ...rest }) => <div {...rest} />)`
  position: relative;
  top: -.5rem;
  left: ${({ totalTime, currentTime }) => (currentTime.hour * 60 * 60 + currentTime.minute * 60 + currentTime.second) * 100 / totalTime}%;
  background-color: #F5A73D;
  height: 1rem;
  width: .2rem;
  transition: all 1s linear;
`

export const Toolbar = styled.div`
  background-color: #000000;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  align-content: center;
`

export const ActionButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 1rem;
  margin-left : 1rem;
  cursor: pointer;
`

export const Timer = styled.div`
  margin-left: 2rem;
  font-size: .8rem;
`