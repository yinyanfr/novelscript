import React from 'react'

const Choice = ({choices, ...props}) => {

    return (
        <div className="nova-choices">
            {
                choices.map((e, i) => (
                    <div key={i} className="nova-choice nova-text-universal">
                        {e}
                    </div>
                ))
            }
        </div>
    )
}

export default Choice
