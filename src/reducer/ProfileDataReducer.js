

const ProfileDataReducer = (state=[],action) =>{
    switch (action.type) {
        case "value":
            return [action.payload]
    
        default:
            return state
    }
}

export default ProfileDataReducer