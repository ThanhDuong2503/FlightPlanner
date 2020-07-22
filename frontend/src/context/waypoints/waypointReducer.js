import {
    ADD_WAYPOINT,
    ADD_WAYPOINT_FAILED,
    ADD_WAYPOINT_SUCCESS,
    DELETE_WAYPOINT_SUCCESS,
    FETCH_WAYPOINTS,
    FETCH_WAYPOINTS_FAILED,
    FETCH_WAYPOINTS_SUCCESS,
} from "./waypointActions";

function waypointReducer(state, action) {
    switch (action.type) {
        case FETCH_WAYPOINTS:
            return { ...state, fetchStatus: 'PENDING' };
        case FETCH_WAYPOINTS_SUCCESS:
            return { ...state, fetchStatus: 'SUCCESS', waypoints: action.payload };
        case FETCH_WAYPOINTS_FAILED:
            return { ...state, fetchStatus: 'FAILED' };
        case ADD_WAYPOINT:
            return { ...state, addStatus: 'PENDING' };
        case ADD_WAYPOINT_SUCCESS:
            return {
                ...state,
                addStatus: 'SUCCESS',
                waypoints: [...state.waypoints, action.payload],
            };
        case ADD_WAYPOINT_FAILED:
            return { ...state, addStatus: 'FAILED' };
        case DELETE_WAYPOINT_SUCCESS:
            return {
                ...state,
                waypoints: state.waypoints.filter((waypoint) => {
                    return waypoint.id !== action.payload;
                }),
            };
        default:
            return state;
    }
}

export default waypointReducer;