import React from 'react';

const Figure = ({src, className, mode, ...props}) => {

    return (
        <div className="nova-figure">
            <img className="nova-figure-image" src={src} alt="figure" />
        </div>
    )
}

export default Figure
