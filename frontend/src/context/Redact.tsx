import { useState, createContext } from "react";
export const NewContext = createContext<{
  good: string;
  bad?: string;
  setGood?: React.Dispatch<React.SetStateAction<string>>;
}>({ good: "", bad: "" });

export const NewProvider = ({ children }: any) => {
  const [good, setGood] = useState<string>("This is epic");
  const bad = "This is Shit!!!";
  return (
    <NewContext.Provider value={{ good, bad, setGood }}>
      {children}
    </NewContext.Provider>
  );
};
