const initialState = {
    roomMode: '',
    roomId: '',
    chatMessages: []
};

export const chatReducer = (state = initialState, action) => {
    if (action.type === "ROOM_TYPE") {
        return {
            ...state,
            roomMode: action.roomMode
        }
    }

    if (action.type === "ROOM_ID") {
        return {
            ...state,
            roomId: action.roomId
        }
    }

    if (action.type === "CHAT_MESSAGE") {
        return {
            ...state,
            chatMessages: action.chatMessages
        }
    }

    return state;
};