export default (state, action) => {
    switch(action.type){
        case "ADD_PLAYER_DATA":
            return{
                ...state,
                bowlers: [...state.bowlers,action.bowler]
            };

        default:
            return state;
    }

}