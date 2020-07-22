import React, { useReducer } from 'react';
import {WaypointStateContext, WaypointDispatchContext} from "./WaypointContext";
import waypointReducer from "./waypointReducer";

function WaypointProvider({ children }) {
    const [state, dispatch] = useReducer(waypointReducer, {
        waypoints: [],
        fetchStatus: undefined,
    });

    return (
        <WaypointStateContext.Provider value={state}>
            <WaypointDispatchContext.Provider value={dispatch}>
                {children}
            </WaypointDispatchContext.Provider>
        </WaypointStateContext.Provider>
    );
}

export default WaypointProvider;