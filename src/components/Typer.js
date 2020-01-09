import React, { useState, useEffect } from 'react';
import Fade from './Fade';

const Typer = ({ children, duration = 1000, onFinishedTyping, ...props }) => {
    const [text, setText] = useState("")

    useEffect(() => {
        const l = children.split("")
        l.map((e, i) => (
            setTimeout(() => {
                setTimeout(() => {
                    setText(text+e)
                    console.log(text)
                }, 0)
                if (i === children.length - 1) {
                    onFinishedTyping()
                }
            }, duration * i)
        ))

        return () => {
            l.map(clearInterval)
        }
    }, [])

    return (
        <div>
            {
                text.split("").map((e, i) => (
                    <Fade key={i}>{e}</Fade>
                ))
            }
        </div>
    )
}

export default Typer
