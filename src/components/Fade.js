import React from 'react';
import { useSpring, animated } from 'react-spring'

const Fade = ({ children }) => {

    const props = useSpring({ opacity: 1, from: { opacity: 0 } })

    return (
        <animated.span style={props}>
            {children}
        </animated.span>
    )
}

export default Fade
