import React from "react";
import { SignIn } from "@clerk/clerk-react"; // Clerk's SignIn component

const SignInPage = () => {
  return (
    <div className="sign-in-container flex justify-center items-center">
      <h2>Sign In</h2>
      <SignIn />
    </div>
  );
};

export default SignInPage;
