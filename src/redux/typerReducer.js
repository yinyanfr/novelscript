const typerDefaultState = {
    txt: "",
    end: false
}

export default (state = typerDefaultState, action) => {
    switch(action.type){
        case "TXT":
            return {
                txt: action.data,
                end: false
            }

        case "ENDTXT":
            return {
                txt: state.txt,
                end: true
            }

        default:
            return state
    }
}
