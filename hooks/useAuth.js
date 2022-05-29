import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => subscription();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
    } catch (error) {
      return error;
    }
  };

  const register = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      return error;
    }
  };

  return {
    user,
    login,
    logout,
    register,
  };
};

export default useAuth;
