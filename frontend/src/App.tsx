// import { Home } from "pages/home";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "pages/home";
import { Login } from "pages/login";
import SignUp from "pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "context";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Login />
      {/* <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/login/federated/facebook" />
      </Routes> */}
      <Toaster />
    </div>
  );
}

export default App;
