import { createSlice } from "@reduxjs/toolkit";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { auth, storageRef } from "../../../firebase";
import { getDatabase, ref, set } from "firebase/database";

const initialState = {
    user: null,
    loader: true,
};

const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        ...initialState,
        user: loadUserFromLocalStorage(),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loader = false;

            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify(action.payload));
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
        console.error("Google login error:", error);
    }
};

export const emailPasswordLogin = (email, password) => async (dispatch) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result);
        const { uid, email, displayName, photoURL } = result.user;
        const user = { uid, email, displayName, photoURL };

        console.log(user);
        dispatch(setUser(user));
    } catch (error) {
        console.error("Email/password login error:", error);
    }
};

export const registerWithEmailPassword = (email, password, name, profilePicture) => async (dispatch) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const { uid, email: userEmail } = result.user;
        console.log("Name:", name);
        console.log("Email:", userEmail);
        console.log("Password:", password);
        // Upload profile picture to Firebase Storage
        const db = getDatabase();

        set(ref(db, '/users'), {
            profile_picture: profilePicture
        })
        const downloadURL = await profilePictureRef.getDownloadURL();

        // Update user profile with the provided name and profile picture URL
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: downloadURL,
        });

        const userData = {
            uid,
            userEmail,
            displayName: name,
            photoURL: downloadURL,
        };

        // Save additional user data to Firestore
        const firestore = getFirestore();
        const usersCollection = collection(firestore, "users");

        await setDoc(doc(usersCollection, uid), userData);

        dispatch(setUser(userData));
    } catch (error) {
        console.error("Registration error:", error);
    }
};

export const logout = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(setUser(null));

        // Remove user data from local storage
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export default userSlice.reducer;
