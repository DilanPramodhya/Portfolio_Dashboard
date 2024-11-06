import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/store/slices/forgotResetPasswordSlice";
import LoadingButton from "./sub-components/LoadingButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAllUserErrors } from "@/store/slices/userSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, message, navigateTo, error, loading]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 min-h-screen">
          <div className="mx-auto grid w-[350px] p-10 gap-6 border-4 border-white bg-white bg-opacity-90 rounded-lg shadow-lg">
            <div className="grid gap-2 text-center">
              <h1 className="text-4xl font-bold text-gray-800">Forgot Password</h1>
              <p className="text-md text-gray-600">
                Enter your email to request a password reset link
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center mt-2">
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm text-blue-600 underline"
                >
                  Remember your password?
                </Link>
              </div>
              {loading ? (
                <LoadingButton content={"Requesting"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 transition duration-200"
                  onClick={handleForgotPassword}
                >
                  Request Reset Password
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="/forgot.gif"
            alt="Forgot Password Illustration"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
