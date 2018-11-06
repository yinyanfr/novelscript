import {createStore, combineReducers} from "redux"

import typerReducer from "./typerReducer"

const configureStore = () => (
    createStore(
        combineReducers({
            typer: typerReducer
        })
    )
)

const store = configureStore()

export default store
