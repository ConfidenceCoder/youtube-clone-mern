import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../types/index";

interface UserState {
    currentUser: userType | null;
    loading: boolean;
    error: boolean;

}

const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.error = false;
            state.loading = false;
        },
        subscription: (state, action: PayloadAction<string>) => {

            if (state.currentUser) {
                if (state.currentUser.subscribedUsers.includes(action.payload)) {
                    state.currentUser.subscribedUsers = state.currentUser.subscribedUsers
                        .filter((channelId) => channelId !== action.payload
                        );
                } else {
                    state.currentUser.subscribedUsers.push(action.payload);
                }
            }
        }
    }
});

export const { loginStart, loginFailure, loginSuccess, logout, subscription } = userSlice.actions;
export default userSlice.reducer;