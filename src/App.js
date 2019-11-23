import React, {useReducer, useEffect, useCallback} from 'react'
import "./App.scss"
import {
  Scenario,
  Stage
}  from "./components/Nova"

import scenario from "./chapter.json"

const App = () => {
  const finish = useCallback(
    () => {
      console.log("finished")
    },
    [],
  )
  return (
    <div className="mainframe">
      <Scenario.Provider value={scenario}>
        <Stage onFinish={finish} />
      </Scenario.Provider>
    </div>
  )
}

export default App
