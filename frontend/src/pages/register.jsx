import React, { useState } from "react";

const RegisterFlow = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    otp: "",
    bio: "",
    profilePic: null,
  });

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // STEP 1: Name
  const StepName = () => (
    <div>
      <h2>Enter your name</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      />

      <button onClick={() => setStep(2)}>
        Next
      </button>
    </div>
  );

  // STEP 2: Phone
  const StepPhone = () => (
    <div>
      <h2>Enter phone number</h2>

      <input
        name="phone"
        placeholder="+92XXXXXXXXXX"
        value={form.phone}
        onChange={handleChange}
      />

      <button
        onClick={() => {
          // later: send OTP API
          setStep(3);
        }}
      >
        Send OTP
      </button>
    </div>
  );

  // STEP 3: OTP
  const StepOTP = () => (
    <div>
      <h2>Enter OTP</h2>

      <input
        name="otp"
        placeholder="6-digit code"
        value={form.otp}
        onChange={handleChange}
      />

      <button
        onClick={() => {
          // later: verify OTP API
          setStep(4);
        }}
      >
        Verify
      </button>
    </div>
  );

  // STEP 4: Profile Setup
  const StepProfile = () => (
    <div>
      <h2>Complete your profile</h2>

      <input
        name="bio"
        placeholder="Bio"
        value={form.bio}
        onChange={handleChange}
      />

      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, profilePic: e.target.files[0] })
        }
      />

      <button
        onClick={() => {
          console.log("FINAL DATA:", form);
          alert("Account created (next: backend)");
        }}
      >
        Finish
      </button>
    </div>
  );

  return (
    <div>
      {step === 1 && <StepName />}
      {step === 2 && <StepPhone />}
      {step === 3 && <StepOTP />}
      {step === 4 && <StepProfile />}
    </div>
  );
};

export default RegisterFlow;