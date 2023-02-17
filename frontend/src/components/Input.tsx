import { motion, AnimatePresence } from "framer-motion";
import { TempType, ErrorBoolType } from "../pages/SignUp";
import { ErrorSVG } from "../assets/svg";

type Props = {
  label: string;
  placeholder: string;
  props: {
    temp: TempType;
    setTemp: React.Dispatch<React.SetStateAction<TempType>>;
    errorBool: ErrorBoolType;
    setErrorBool: React.Dispatch<React.SetStateAction<ErrorBoolType>>;
  };
};

export default function Input({ label, placeholder, props }: Props) {
  const { temp, setTemp, errorBool, setErrorBool } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemp((prev) => ({ ...prev, [label]: e.target.value }));
  };
  return (
    <div className="relative mb-3 ">
      <h2 className="mb-1">{label}</h2>
      <motion.input
        className="w-full px-4 py-2 border-2 rounded outline-none border-slate-300"
        whileFocus={{
          border: `2px solid #3b82f6`,
          transition: {
            duration: 0.15,
          },
        }}
        animate={{
          border: `2px solid ${errorBool[label] ? "#ce4c45" : "#cbd5e1"}`,
          transition: {
            // duration: 0.35,
          },
        }}
        onChange={handleChange}
        onFocus={() => {
          setErrorBool((prev) => ({ ...prev, [label]: false }));
        }}
        placeholder={placeholder}
        type={label === "Password" ? "password" : "text"}
        value={temp[label]}
      />
      <AnimatePresence mode="wait">
        {errorBool[label] && (
          <>
            <motion.p
              initial={{
                y: -10,
                height: 0,
                opacity: 0,
                color: "#ce4c45",
              }}
              animate={{
                y: 0,
                height: "auto",
                opacity: 1,
                transition: {
                  // duration: 5,
                  type: "spring",
                  bounce: 0.6,
                },
              }}
              exit={{
                y: -5,
                opacity: 0,
                height: 0,
                // transition: {},
              }}
            >
              The {label} cannot be empty !!
            </motion.p>
            <ErrorSVG />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
