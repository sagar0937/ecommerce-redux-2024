import React from "react";
import { SignUp } from "@clerk/clerk-react"; // Clerk's SignUp component

const SignUpPage = () => {
  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
