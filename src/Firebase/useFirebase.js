import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initilizeauthentication from "./firebase.init";

initilizeauthentication();

const useFirebase = () => {
  const [user, setuser] = useState({});
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
      }
    });
    return unsubscribe;
  }, []);
  const logOut = () => {
    signOut(auth).then(() => {
      setuser({});
    });
  };
  return {
    user,
    signInWithGoogle,
    logOut,
    setUpRecaptcha,
  };
};
export default useFirebase;
