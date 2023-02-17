import { TRArrowSvg } from "../assets/svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TempType, ErrorBoolType } from "../pages/SignUp";

export default function Login() {
  const [temp, setTemp] = useState<TempType>({
    Email: "",
    Password: "",
  });

  const [errorBool, setErrorBool] = useState<ErrorBoolType>({
    Email: false,
    Password: false,
  });

  const handleLogin = () => {
    if (temp.Password && temp.Email) {
      //Sumbit data
      setTemp({ Username: "", Password: "", Email: "" });
    } else if (!temp.Email) {
      setErrorBool((prev) => ({
        ...prev,
        Email: true,
      }));
    } else if (!temp.Password) {
      setErrorBool((prev) => ({
        ...prev,
        Password: true,
      }));
    } else {
      setErrorBool((prev) => ({
        Email: true,
        Password: true,
      }));
    }
  };

  const props = { temp, setTemp, errorBool, setErrorBool };

  return (
    <div className="flex-col mx-auto h-fit w-90 mt-20 ">
      <TRArrowSvg />
      <h1 className="font-medium text-2.9xl mt-2 mb-1">Hey, hello 👋</h1>
      <h3 className="mb-3 text-base text-slate-600">Welcome back!!</h3>
      {/* <Input label="Username" placeholder="Joe" /> */}
      <Input label="Email" placeholder="joe@gmail.com" props={props} />
      <Input label="Password" placeholder="#$%^&*" props={props} />
      <Button label="Log In" handleFunction={handleLogin} />
      <Link className="block m-auto cursor-pointer text-cyan-700 " to="/signUp">
        Dont have an account? Try{" "}
        <span className="underline underline-offset-2">Sign Up</span>.
      </Link>
    </div>
  );
}

//w-fit
