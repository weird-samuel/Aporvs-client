import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create a user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   gmail sign up
  const signupWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //   login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   logout
  const logout = () => {
    return signOut(auth);
  };
  //  update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    //   .then(() => {
    //     console.log("Profile updated");
    //   })
    //   .catch((err) => {
    //     console.log("Error:" + err.message);
    //   });
  };
  //   check signed in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
        setUser(null);
      }
    });
    return () => {
      return unsubscribe;
    };
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    signupWithGoogle,
    login,
    logout,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
