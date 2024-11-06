import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingButton from "./sub-components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading, navigateTo]);

  return (
    <div>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
          <div className="mx-auto grid w-[350px] p-10 gap-6 border-4 border-white bg-white bg-opacity-90 rounded-lg shadow-lg">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-gray-800">Login</h1>
              <p className="text-sm text-gray-600">
                Enter your email & password below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Link
                    to={"/password/forgot"}
                    className="ml-auto inline-block text-sm text-blue-600 underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loading ? (
                <LoadingButton content={"Logging In"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
            <div className="font-bold text-center">
              If you don&apos;t have an account, please
              <Link to={"/register"}>
                <Button className="bg-slate-600 text-white w-[30%] ml-2 hover:bg-slate-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="/Login.gif"
            alt="Login Illustration"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
