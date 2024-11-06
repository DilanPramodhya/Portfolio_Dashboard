import { Button } from "@/components/ui/button";
import LoadingButton from "./sub-components/LoadingButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { clearAllUserErrors, getUser } from "@/store/slices/userSlice";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
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
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, message, navigateTo, error, loading]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100px] lg:grid-cols-2 xl:min-h-[100px]">
        <div className="min-h-[100vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-600">
          <div className="mx-auto grid w-[350px] p-10 gap-6 border-4 border-green-800  bg-blue-200">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                set a new password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {loading ? (
                <LoadingButton content={"Resetting Password"} />
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleResetPassword}
                >
                  Request for reset Password
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/dashboard/public/placeholder.gif"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
