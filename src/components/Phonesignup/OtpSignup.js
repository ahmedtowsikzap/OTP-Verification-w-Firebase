import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const OtpSignup = () => {
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Login with Firebase OTP</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
           <PhoneInput
           defaultCountry="BD"
           value={}
           onChange={}
           placeholder="Please Enter Your Phone Number"
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default OtpSignup;
