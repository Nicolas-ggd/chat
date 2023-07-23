const initialState = {
    roomMode: '',
    roomId: '',
    chatMessages: [],
    selectedChat: ''
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

    if (action.type === "SELECTED_CHAT") {
        return {
            ...state,
            selectedChat: action.selectedChat
        }
    }

    return state;
};