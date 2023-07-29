const initialState = {
    isPublic: false,
    roomId: '',
    selectedChat: '',
    recipient: '',
};

export const chatReducer = (state = initialState, action) => {
    if (action.type === "ROOM_TYPE") {
        return {
            ...state,
            isPublic: action.isPublic
        }
    }

    if (action.type === "ROOM_ID") {
        return {
            ...state,
            roomId: action.roomId
        }
    }

    if (action.type === "SELECTED_CHAT") {
        return {
            ...state,
            selectedChat: action.selectedChat
        }
    }

    if (action.type === "RECIPIENT") {
        return {
            ...state,
            recipient: action.recipient
        }
    }

    return state;
};