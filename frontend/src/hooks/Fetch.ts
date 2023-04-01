import { useMutation } from "react-query";

async function fetchLoginUser() {
  const data = await fetch("http://localhost:1337/loginUser", {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "bhaumik.kore31@gmail.com",
      password: "12345",
    }),
  });
  return data;
}

const {data, error, isError, isLoading} = useMutation("user", fetchLoginUser);
