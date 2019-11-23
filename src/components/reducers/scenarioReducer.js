const initState = {
    chapter: "1",
    line: 0
}

export default (state = initState, action) => {
    return action || initState
}
