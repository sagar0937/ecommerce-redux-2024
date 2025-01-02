// ProtectedRoute.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  //const auth = useAuth();
  const navigate = useNavigate();
  const { userId, isLoaded } = useAuth();
  console.log("------", userId, isLoaded);

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  return children; // If authenticated, render the children (Dashboard, etc.)
};

export default React.memo(ProtectedRoute);
