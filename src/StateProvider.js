import React , { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

export const initialState = {
    bowlers: []
}

export const StateContext = createContext(initialState);

export const StateProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,initialState);

    useEffect(() => {
        console.log("dispatch",state.bowlers);
    });

    //HERE WE HAVE TO TAKE NOTE THAT WHEN WE CALL addToBasket({id:svvs , is:svvs}) here id from callled file 
    // and StateProvider file must be same id:svvs is allowed but is:svvs isn't allowed bcz in function definition
    // addPlayerData = ({ livedata:res.id }) -> function call from Scoreborad.js file
    //  addPlayerData = ({ livedata }) -> function definition from StateProvider.js file

    const addPlayerData = ({ livedata }) => {
        console.log("state Provier :- ",(livedata));
        dispatch({
            type:"ADD_PLAYER_DATA",
            bowler:[
                {
                    id:livedata.MatchId
                },
                {   
                    desc:livedata.bowler1,
                    name:livedata.bowler1,
                    over:livedata.bover1,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun1,
                    wicket:livedata.bwicket1,
                    eco:livedata.beco1
                },
                {
                    desc:livedata.bowler2,
                    name:livedata.bowler2,
                    over:livedata.bover2,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun2,
                    wicket:livedata.bwicket2,
                    eco:livedata.beco2
                },
                {
                    desc:livedata.bowler3,
                    name:livedata.bowler3,
                    over:livedata.bover3,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun3,
                    wicket:livedata.bwicket3,
                    eco:livedata.beco3
                },
                {
                    desc:livedata.bowler4,
                    name:livedata.bowler4,
                    over:livedata.bover4,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun4,
                    wicket:livedata.bwicket4,
                    eco:livedata.beco4
                },
                {
                    desc:livedata.bowler5,
                    name:livedata.bowler5,
                    over:livedata.bover5,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun5,
                    wicket:livedata.bwicket5,
                    eco:livedata.beco5
                },
                {
                    desc:livedata.bowler6,
                    name:livedata.bowler6,
                    over:livedata.bover6,
                    // meidan:livedata.meidan, // not getting data from api
                    run:livedata.brun6,
                    wicket:livedata.bwicket6,
                    eco:livedata.beco6
                },
            ]
        })
    }

    return(
        <StateContext.Provider value={{ addPlayerData ,bowlers:state.bowlers }}>
            {children}
        </StateContext.Provider>
    )
}