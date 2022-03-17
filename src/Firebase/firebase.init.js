import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initilizeauthentication = () => {
  initializeApp(firebaseConfig);
};
export default initilizeauthentication;
