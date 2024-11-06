import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { loading, error, isAuthenticated, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5 text-center font-bold text-xl mt-4">
                Update Your Dashboard Password Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="text"
                  placeholder="Your Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="text"
                  placeholder="Your New Passord"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="text"
                  placeholder="Confirm Your New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full"
                >
                  Update Password
                </Button>
              ) : (
                <LoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
