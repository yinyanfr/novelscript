import React, { Component } from 'react'
import Typer from "react-typing-animation"

class Talkbox extends Component{

    state = {

    }

    render = () => (
        <div style={this.props.style}>
        {
            this.props.txt.length
            ? (
                this.props.end
                ? <span>{this.props.txt}</span>
                : <Typer onFinishTyping={this.props.onFinish}><span>{this.props.txt}</span></Typer>
            )
            : ""
        }
        </div>
    )
}

export default Talkbox
