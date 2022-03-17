import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initilizeauthentication from "./firebase.init";

initilizeauthentication();

const useFirebase = () => {
  const [user, setuser] = useState({});
  const auth = getAuth();
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  return {
    user,
    setUpRecaptcha,
  };
};
export default useFirebase;
