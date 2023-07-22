const initialState = {
    roomMode: '',
    roomId: ''
};

export const chatReducer = (state = initialState, action) => {
    if (action.type === "ROOM_TYPE") {
        return {
            ...state,
            roomMode: action.roomMode
        }
    }

    if(action.type === "ROOM_ID") {
        return {
            ...state,
            roomId: action.roomId
        }
    }

    return state;
};