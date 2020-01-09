import React, {useContext, useState, useEffect} from 'react'
import Line from "./Line"
import {nextLine, firstLine, getLine} from "./utils/util"
import Scenario from "./contexts/Scenario"
import Figure from './Figure'
import Choice from './Choice'

const Stage = ({ className, onFinish, ...props }) => {
    const scenario = useContext(Scenario)
    const [next, setNext] = useState("pending")
    const [stage, setStage] = useState(firstLine(scenario))
    const line = getLine(scenario, stage)

    const onNext = e => {
        e.stopPropagation()
        if(stage){
            if(next === "pending"){
                setNext("success")
            }
            if(next === 'success'){
                const nextStage = nextLine(scenario, stage)
                if(nextStage){
                    setStage(nextStage)
                }else{
                    onFinish()
                }
                setNext("pending")
            }
        }
    }
    
    return (
        <div
            className={className || "nova-stage"}
            onClick={stage ? onNext : null}
            style={{backgroundImage: `url(./media/${line.bg})`}}
        >
            {
                line.figures
                ? (
                    <div className="nova-figures">
                        {
                            line.figures.map((e, i) => (
                                <Figure key={i} src={`./media/${e}`} />
                            ))
                        }
                    </div>
                )
                : ""
            }
            {
                line.choices
                ? <Choice choices={line.choices} />
                : ""
            }
            <Line line={line} next={next} setNext={setNext} />
            {
                line.avatar
                    ? (
                        <div className="nova-avatar">
                            <img className="nova-avatar-image" src={`./media/${line.avatar}`} alt="avatar" />
                        </div>
                    )
                    : ""
            }
        </div>
    )
}

export default Stage
