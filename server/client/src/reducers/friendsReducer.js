let INITIAL_STATE = {
    friends:[]
}

const friendsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FETCH_FRIENDS':
            return {...state, friends:action.payload}
        default:
            return {...state}
    }
}

export default friendsReducer;