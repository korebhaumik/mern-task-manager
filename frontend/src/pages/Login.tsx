import { TRArrowSvg } from "../assets/svg";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/Login.context";

export default function Login() {
  const LoginProps = useContext(LoginContext);
  if (!LoginProps) {
    return;
  }
  const { loginTemp, setLoginTemp, isLoading, refetch } = LoginProps;

  return (
    <div className="flex-col mx-auto h-fit w-90 mt-20 ">
      <TRArrowSvg />
      <h1 className="font-medium text-2.9xl mt-2 mb-1">Hey, hello 👋</h1>
      <h3 className="mb-3 text-base text-slate-600">Welcome back!!</h3>
      {/* <Input label="Username" placeholder="Joe" /> */}
      <Input placeholder="joe@gmail.com" label="email" body={loginTemp.email} setValue={setLoginTemp} />
      <Input placeholder="#$%^&*" label="password" body={loginTemp.password} setValue={setLoginTemp} />
      <Button label="Log In" handleFunction={refetch} isLoading={isLoading} />
      <Link className="block m-auto cursor-pointer text-cyan-700 " to="/signUp">
        Dont have an account? Try{" "}
        <span className="underline underline-offset-2">Sign Up</span>.
      </Link>
    </div>
  );
}

//w-fit
