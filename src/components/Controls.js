import React from 'react';

const Controls = ({ className, ...props }) => {

    return (
        <div className={"nova-controls" + (className ? " " + className : "")}>
            <div><i className="fas fa-play nova-control-icon"></i></div>
            <div><i className="fas fa-forward nova-control-icon"></i></div>
            <div><i className="fas fa-history nova-control-icon"></i></div>
            <div><i className="fas fa-cog nova-control-icon"></i></div>
            {
                window.innerWidth >= 1440
                    ? (
                        <>
                            <div><i className="fas fa-save nova-control-icon"></i></div>
                            <div><i className="fas fa-folder-open nova-control-icon"></i></div>
                        </>
                    )
                    : ""
            }
        </div>
    )
}

export default Controls
