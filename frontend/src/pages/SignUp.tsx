import { TRArrowSvg } from "../assets/svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export type TempType = {
  [key: string]: string;
  // [key: "Email"]: string;
  // [key: "Password"]: string;
};

export type ErrorBoolType = {
  [key: string]: boolean;
  // Username?: boolean;
  // Email: boolean;
  // Password: boolean;
};

export default function SignUp() {
  const [temp, setTemp] = useState<TempType>({
    Username: "",
    Email: "",
    Password: "",
  });

  const [errorBool, setErrorBool] = useState<ErrorBoolType>({
    Username: false,
    Email: false,
    Password: false,
  });

  const handleSignUp = () => {
    if (temp.Username && temp.Password && temp.Email) {
      //Sumbit data
      setTemp({ Username: "", Password: "", Email: "" });
    } else if (!temp.Username) {
      setErrorBool((prev) => ({
        ...prev,
        Username: true,
      }));
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
        Username: true,
        Email: true,
        Password: true,
      }));
    }
  };

  const props = { temp, setTemp, errorBool, setErrorBool };

  return (
    <div className="flex-col mx-auto h-fit w-90 mt-20">
      <TRArrowSvg />
      <h1 className="font-medium text-2.9xl mt-2 mb-1">
        Create a new Account 🥳
      </h1>
      <h3 className="mb-3 text-base text-slate-600">
        Pls fill the following information.
      </h3>
      <Input label="Username" placeholder="Joe" props={props} />
      <Input label="Email" placeholder="joe@gmail.com" props={props} />
      <Input label="Password" placeholder="#$%^&*" props={props} />
      <Button label="Create Account" handleFunction={handleSignUp} />
      <Link className="block m-auto cursor-pointer text-cyan-700" to="/">
        Already have an account? Try{" "}
        <span className="underline underline-offset-2">login</span>.
      </Link>
    </div>
  );
}

//w-fit
