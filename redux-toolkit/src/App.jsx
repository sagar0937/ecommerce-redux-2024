// export default App;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react"; // Import Clerk components
import Applayout from "./uicomponents/layout/Applayout";
import Dashbaord from "./pages/Dashbaord";
import Cart from "./pages/Cart";
import { useAuth } from "@clerk/clerk-react"; // For checking authentication
import SignInPage from "./pages/Signin";
import SignUpPage from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";

// You should retrieve your Clerk Publishable Key from an environment variable or hardcode it.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashbaord />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        // Sign-in and Sign-up routes
        {
          path: "/sign-in",
          element: <SignInPage />, // Create this page for SignIn functionality
        },
        {
          path: "/sign-up",
          element: <SignUpPage />, // Create this page for SignUp functionality
        },
      ],
    },
  ]);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  );
}

export default App;
