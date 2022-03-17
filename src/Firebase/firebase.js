import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXxoKGuK4Ggo7FXLH73nqGXY8kzo7bqT8",
  authDomain: "otp-login-react.firebaseapp.com",
  projectId: "otp-login-react",
  storageBucket: "otp-login-react.appspot.com",
  messagingSenderId: "299014616673",
  appId: "1:299014616673:web:a356d47abf32424a8a9c20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
