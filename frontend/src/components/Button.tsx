import { motion } from "framer-motion";
type Props = {
  label: string;
  handleFunction(): void;
};

export default function Button({ label, handleFunction }: Props) {
  return (
    <motion.button
      className="w-full py-3 my-2 rounded bg-slate-900 text-slate-100"
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
      {label}
    </motion.button>
  );
}
