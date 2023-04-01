import { createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

type childrenType = {
  children: React.ReactNode;
};
export type LoginTempType = {
  email: { value: string; isError: boolean; message: string };
  password: { value: string; isError: boolean; message: string };
  [key: string]: { value: string; isError: boolean; message: string };
};
type ContextType =
  | {
      loginTemp: LoginTempType;
      setLoginTemp: React.Dispatch<React.SetStateAction<LoginTempType>>;
      data: any;
      isLoading: boolean;
      refetch(): any;
    }
  | undefined;

export const LoginContext = createContext<ContextType>(undefined);

export function LoginProvider({ children }: childrenType) {
  const [loginTemp, setLoginTemp] = useState<LoginTempType>({
    email: {
      value: "",
      isError: false,
      message: "The email cannot be empty !!",
    },
    password: {
      value: "",
      isError: false,
      message: "The password cannot be empty !!",
    },
  });

  //Query
  async function fetchAuthUser() {
    return await fetch("http://localhost:1337/loginUser", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginTemp.email.value,
        password: loginTemp.email.value,
      }),
    });
  }
  const { data, error, isError, isLoading, refetch } = useQuery(
    "user",
    fetchAuthUser,
    { enabled: false }
  );

  console.log(loginTemp);
  if (isError) {
    const { type, message } = error as { type: string; message: string };
    setLoginTemp((prev) => {
      const newState = {
        ...prev,
        email: {
          value: "",
          isError: true,
          message: message,
        },
      };
      return newState;
    });
  }

  return (
    <LoginContext.Provider
      value={{ loginTemp, setLoginTemp, data, isLoading, refetch }}
    >
      {children}
    </LoginContext.Provider>
  );
}

// const handleLogin = () => {
//     if (temp.Password && temp.Email) {
//       //Sumbit data
//       setTemp({ Email: "" ,Password: "", });
//     } else if (!temp.Email) {
//       setLoginError((prev) => ({
//         ...prev,
//         Email: {...prev.Email, isError: true},
//       }));
//     } else if (!temp.Password) {
//       setLoginError((prev) => ({
//         ...prev,
//         Password: true,
//       }));
//     } else {
//       setLoginError((prev) => ({
//         Email: true,
//         Password: true,
//       }));
//     }
//   };
