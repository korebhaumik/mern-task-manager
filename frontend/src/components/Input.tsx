import { motion, AnimatePresence } from "framer-motion";
import { LoginTempType } from "../context/Login.context";
import { ErrorSVG } from "../assets/svg";

type Props = {
  label: string;
  placeholder: string;
  body: { value: string; isError: boolean; message: string };
  setValue: React.Dispatch<React.SetStateAction<LoginTempType>>;
};

export default function Input({ label, placeholder, body, setValue }: Props) {
  // const { temp, setTemp, errorBool, setErrorBool } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [label]: { ...prev[label], value: e.target.value },
    }));
  };
  return (
    <div className="relative mb-3 ">
      <h2 className="mb-1">{label.charAt(0).toUpperCase() + label.slice(1)}</h2>
      <motion.input
        className="w-full px-4 py-2 border-2 rounded outline-none border-slate-300"
        whileFocus={{
          border: `2px solid #3b82f6`,
          transition: {
            duration: 0.15,
          },
        }}
        animate={{
          border: `2px solid ${body.isError ? "#ce4c45" : "#cbd5e1"}`,
          transition: {
            // duration: 0.35,
          },
        }}
        onChange={handleChange}
        // onFocus={() => {
        //   setErrorBool((prev) => ({ ...prev, [label]: false }));
        // }}
        placeholder={placeholder}
        type={label === "password" ? "password" : "text"}
        value={body.value}
      />
      <AnimatePresence mode="wait">
        {body.isError && (
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
              {body.message}
            </motion.p>
            <ErrorSVG />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
