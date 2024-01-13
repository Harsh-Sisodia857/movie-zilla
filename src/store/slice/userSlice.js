import { createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const initialState = {
    user: null,
    loader: true,
};

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        ...initialState,
        user: loadUserFromLocalStorage(),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loader = false;

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { setUser, setLoader } = userSlice.actions;

export const googleLogin = () => async (dispatch) => {
    try {
        console.log("GOOGLE LOGIN ");
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        const { uid, email, displayName, photoURL, accessToken } = result.user;
        const user = { uid, email, displayName, photoURL, accessToken };

        console.log(user);
        dispatch(setUser(user));
    } catch (error) {
        console.error('Google login error:', error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(setUser(null));

        // Remove user data from local storage
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
    }
};


export default userSlice.reducer;
