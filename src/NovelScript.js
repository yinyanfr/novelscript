import React, { Component } from 'react';
import Stage from "./components/Stage"

class NovelScript extends Component {


	render = () => (
        <div>
            <Stage style={{
                width: 1280,
                height: 720,
                border: "1px solid black"
            }}></Stage>
        </div>
	)

}

export default NovelScript;
