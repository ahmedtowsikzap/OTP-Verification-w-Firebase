import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Alert, Button, Form } from "react-bootstrap";
import useFirebase from "../../Firebase/useFirebase";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Custom.css";

const OtpSignup = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState();
  const { setUpRecaptcha } = useFirebase();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please Enter valid number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/welcome");
    } catch (err) {
      setError("Invalid Code. check your OTP again!");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="my-5 pt-5 mx-5 textnow"
      >
        <div className="p-4 box">
          <motion.h1
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 120, delay: 2.4 }}
            className="mb-5 tt"
          >
            Login with OTP
          </motion.h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <PhoneInput
                className="w-50"
                defaultCountry="GB"
                value={number}
                onChange={setNumber}
                placeholder="Please Enter Your Phone Number"
              />
              <div className="mt-5" id="recaptcha-container" />
            </Form.Group>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.3 }}
            >
              <Button variant="danger" type="submit">
                Send OTP!
              </Button>
            </motion.div>
          </Form>
          <Form
            className="mt-5"
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <Form.Group className="mb-3" controlId="formBasicotp">
              <Form.Control
                type="otp"
                placeholder="Enter the one time password"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
            >
              <Button variant="warning" type="submit">
                Verify OTP!
              </Button>
            </motion.div>
          </Form>
        </div>
      </motion.div>
    </>
  );
};

export default OtpSignup;
