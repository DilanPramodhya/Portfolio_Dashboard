import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "./sub-components/LoadingButton";
import { clearAllUserErrors, register } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    password: "",
    portfolioURL: "",
    githubURL: "",
    instagramURL: "",
    facebookURL: "",
    twitterURL: "",
    linkedInURL: "",
    avatar: null,
    resume: null,
  });

  const { loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const registrationData = new FormData();
    for (const key in formData) {
      registrationData.append(key, formData[key]);
    }

    dispatch(register(registrationData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      navigate("/dashboard");
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-600 via-green-400-600 to-yellow-200">
          <div className="bg-sky-200 shadow-md rounded-lg p-8 w-full max-w-md">
            <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleRegister} encType="multipart/form-data" >
              {[
                {
                  label: "Full Name",
                  name: "fullName",
                  type: "text",
                  required: true,
                },
              ].map(({ label, name, type, required }) => (
                <div key={name} className="mb-4">
                  <Label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </Label>
                  <Input
                    type={type}
                    name={name}
                    onChange={handleInputChange}
                    required={required}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                  />
                </div>
              ))}

              <div className="flex mb-4 gap-4">
                {[
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    required: true,
                  },
                  {
                    label: "Password",
                    name: "password",
                    type: "password",
                    required: true,
                  },
                ].map(({ label, name, type, required }) => (
                  <div key={name} className="flex-1">
                    <Label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </Label>
                    <Input
                      type={type}
                      name={name}
                      onChange={handleInputChange}
                      required={required}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              {[
                { label: "Phone", name: "phone", type: "tel" },
                { label: "About Me", name: "aboutMe", type: "text" },
                { label: "Portfolio URL", name: "portfolioURL", type: "url" },
                { label: "GitHub URL", name: "githubURL", type: "url" },
                { label: "Instagram URL", name: "instagramURL", type: "url" },
                { label: "Facebook URL", name: "facebookURL", type: "url" },
                { label: "Twitter URL", name: "twitterURL", type: "url" },
                { label: "LinkedIn URL", name: "linkedInURL", type: "url" },
              ].map(({ label, name, type, required }) => (
                <div key={name} className="mb-4">
                  <Label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                  </Label>
                  <Input
                    type={type}
                    name={name}
                    onChange={handleInputChange}
                    required={required}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                  />
                </div>
              ))}

              <div className="flex flex-col sm:flex-row mb-6 gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Avatar
                  </Label>
                  <Input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Resume
                  </Label>
                  <Input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
                  />
                </div>
              </div>

              {loading ? (
                <LoadingButton content={"Registering..."} />
              ) : (
                <Button
                  type="submit"
                  className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  Register
                </Button>
              )}
              <div className="font-bold text-center mt-4">
              If you already have an account, please
              <Link to={"/login"}>
                <Button className="bg-slate-600 text-white w-[30%] mt-2 hover:bg-slate-700">
                  Login
                </Button>
              </Link>
            </div>
            </form>
          </div>
        </div>
        <div className="hidden lg:block">
          <img
            src="/reg.gif"
            alt="Login Illustration"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
