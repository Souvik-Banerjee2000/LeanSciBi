export const ChartReducer = (state, action) => {
    switch (action.type) {
        case action.type:
            state[`${action.type}`] = action.value;
            return state;
        default:
            return state;
    }
}