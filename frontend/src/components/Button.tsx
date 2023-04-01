import { motion } from "framer-motion";
import { LoadingSvg } from "../assets/svg";
type Props = {
  label: string;
  handleFunction(): void;
  isLoading: boolean;
};

export default function Button({ label, handleFunction, isLoading }: Props) {
  return (
    <motion.button
      className="my-2 rounded bg-slate-900 text-slate-100 w-full"
      whileTap={{
        y: 0,
        scale: 0.95,
        transition: {
          duration: 0.1,
        },
      }}
      whileHover={{
        transition: {
          duration: 0.25,
        },
      }}
      onClick={handleFunction}
    >
      {isLoading ? <LoadingSvg /> : <span className="block my-3">{label}</span>}
    </motion.button>
  );
}
