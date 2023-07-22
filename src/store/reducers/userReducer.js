const initialState = {
    userId: '',
    name: '',
    email: '',
};

export const userReducer = (state = initialState, action) => {
    if (action.type === "USER_DATA") {
        return {
            ...state,
            userId: action.userId,
            name: action.name,
            email: action.email,
        }
    }

    return state;
};