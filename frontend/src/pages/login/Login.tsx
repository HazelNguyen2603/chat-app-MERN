import { useLogin } from "hooks";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ username, password });
  };

  const facebook = async () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-green-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="label-text text-base">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="label-text text-base">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-green-600 mt-2 inline-block"
          >
            Don't have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-outline btn-block btn-sm mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <button
          onClick={facebook}
          className="btn btn-outline  btn-block btn-sm mt-2 "
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              <FaFacebook style={{ color: "#4267B2" }} />
              <span>Facebook</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
