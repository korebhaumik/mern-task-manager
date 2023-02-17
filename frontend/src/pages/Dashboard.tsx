import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CrossSvg, DocSvg, LeftArrowSvg, UpArrowSvg } from "../assets/svg";
import { useContext } from "react";
import { DashboardContext } from "../context/Dashboard.context";

export default function Dashboard() {
  const DashboardProp = useContext(DashboardContext);

  if (!DashboardProp) return null;
  const { notesArr, addNote, removeNote, toggleNote, temp, setTemp } =
    DashboardProp;

  const notes: JSX.Element[] = notesArr.map((note, index) => (
    <motion.div
      className="relative"
      key={note.id}
      initial={{
        height: 0,
        opacity: 0,
        // y: -10,
      }}
      animate={{
        height: "auto",
        opacity: 1,
        y: 0,
        transition: {
          // duration:0.4 ,
          type: "spring",
          mass:0.5,
          damping: 8
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        // y: -10,
        transition: {
          height: {
            duration: 0.4,
          },
          opacity: {
            duration: 0.2,
          },
          
        },
      }}
      // transition={{
      //   duration: 10,
      // }}
    >
      {note.description && <UpArrowSvg id={note.id} isActive={note.isActive} />}
      <CrossSvg id={note.id} />
      <h2 className="text-xl font-medium pt-2.5">{note.title}</h2>
      <h3 className="text-cyan-600 ">{note.createdAt} </h3>
      <AnimatePresence initial={false}>
        {note.isActive && (
          <motion.p
            className=" font-normal text-slate-500"
            initial={{
              height: 0,
              opacity: 0,
              y: -10,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              y: 0,
              transition: {
                // duration:0.4 ,
                type: "spring",
                mass:0.5,
                damping: 7
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              y: -10,
              transition: {
                opacity: {
                  duration: 0.2,
                },
              },
            }}
          >
            {note.description}
          </motion.p>
        )}
      </AnimatePresence>

      {/* {index < notesArr.length - 1 && ( <motion.hr className="mt-2 border-slate-300" /> )} */}
    </motion.div>
  ));

  //Add Generic Note
  const handleAdd = () => {
    if (temp) {
      addNote({
        id: Math.random(),
        title: temp,
        description:
          "Lorem ipsum dolor sit amet consectetur. Ultrices parturient luctus diam volutpat et. Rhoncus pharetra interdum lorem nibh. ",
        createdAt: "10:45 PM, May 25",
        isActive: true,
      });
      setTemp("");
    }
  };

  return (
    <div className="w-auto mx-auto mt-10">
      <div className="relative p-5 sm:border-2 sm:mx-10 sm:max-w-3xl sm:rounded-lg sm:p-7 md:px-9 md:m-auto">
        <LogoutElement />
        <h1 className="text-2xl font-medium ">Welcome Bhaumik,</h1>
        <h2 className="text-cyan-600">#bhaumik.kore31@gmail.com</h2>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur. Pulvinar leo lacinia maecenas.
        </p>
        <div className="flex max-w-xl ">
          <input
            className="w-full min-w-0 px-4 py-2 border-2 rounded outline-none border-slate-300"
            type="text"
            placeholder="Give a suitable title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTemp(e.target.value)
            }
            value={temp}
          />
          <button
            className="px-6 py-2 ml-4 border-2 rounded border-slate-900 bg-slate-900 text-slate-50"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
      <div className="p-5 sm:border-2 sm:mx-10 sm:m-5 sm:max-w-3xl sm:rounded-lg sm:p-7 md:px-9 md:mx-auto">
        <AnimatePresence initial={false}>
          {notesArr.length ? notes : <EmptyElement />}
        </AnimatePresence>
      </div>
      <div className="mx-auto h-24"></div>
    </div>
  );
}

export function EmptyElement() {
  return (
    <motion.div className="flex flex-wrap items-center text-xl">
      <DocSvg />
      <p className=" sm:ml-3">You have no upcoming events...</p>
    </motion.div>
  );
}

export function LogoutElement() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute flex items-center px-3 py-1 border-2 rounded border-slate-900 w-fit right-5 sm:right-10"
      onClick={() => navigate("/")}
    >
      <LeftArrowSvg />
      <p className="font-medium">logout</p>
    </div>
  );
}
