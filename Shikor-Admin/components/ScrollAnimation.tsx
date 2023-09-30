import { AnimationOnScroll } from 'react-animation-on-scroll'
import { useIsServer } from './CONSTANTS'

const ScrollAnimation: typeof AnimationOnScroll = ({
  children,
  initiallyVisible,
  animateOnce = true,
  ...rest
}) => {
  const isServer = useIsServer()
  return (
    <AnimationOnScroll
      initiallyVisible={
        typeof initiallyVisible !== 'undefined' ? initiallyVisible : isServer
      }
      animateOnce={animateOnce}
      {...rest}
    >
      {children}
    </AnimationOnScroll>
  )
}

export default ScrollAnimation
