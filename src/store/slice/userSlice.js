import { createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const initialState = {
    user: null,
    loader: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { setUser, setLoader } = userSlice.actions;

export const googleLogin = () => async (dispatch) => {
    try {
        console.log("GOOGLE LOGIN ")
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        dispatch(setUser(result.user));
    } catch (error) {
        console.error('Google login error:', error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(setUser(null));
    } catch (error) {
        console.error('Logout error:', error);
    }
};

export default userSlice.reducer;
