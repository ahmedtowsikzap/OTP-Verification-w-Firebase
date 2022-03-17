import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Alert, Button, Form } from "react-bootstrap";
import useFirebase from "../../Firebase/useFirebase";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
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
      <div className="my-5 pt-5 mx-5 textnow">
        <div className="p-4 box">
          <h1 className="mb-5 tt">Login with OTP</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <PhoneInput
                className="w-50"
                defaultCountry="BD"
                value={number}
                onChange={setNumber}
                placeholder="Please Enter Your Phone Number"
              />
              <div className="mt-5" id="recaptcha-container" />
            </Form.Group>
            <div>
              <Button variant="danger" type="submit">
                Send OTP!
              </Button>
            </div>
          </Form>
          <Form
            className="mt-5"
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <Form.Group className="mb-3" controlId="formBasicotp">
              <Form.Control
                type="otp"
                placeholder="Enter otp"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button variant="warning" type="submit">
                Verify OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OtpSignup;
