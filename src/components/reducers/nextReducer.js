const initialState = "pending"

export default (state = initialState, action) => {
    return action || initialState
}
