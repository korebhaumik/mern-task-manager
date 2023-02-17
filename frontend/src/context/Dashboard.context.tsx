//Native
import { useState, useReducer, createContext } from "react";

//utitls
import { data } from "./data";

//types
type ChildrenType = {
  children: React.ReactNode;
};
type ContextValue =
  | {
      notesArr: NotesArrType;
      addNote: (payload: NoteType) => void;
      removeNote: (id: number) => void;
      toggleNote: (id: number) => void;
      temp: string;
      setTemp: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined;
export type NoteType = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  isActive: boolean;
};
export type NotesArrType = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  isActive: boolean;
}[];

export const DashboardContext = createContext<ContextValue>(undefined);

export const DashboardProvider = ({ children }: ChildrenType) => {
  //State
  const [notesArr, setNotesArr] = useState<NotesArrType>(data);
  const [temp, setTemp] = useState<string>("");

  //Methods
  function addNote(payload: NoteType): void {
    setNotesArr((prev) => [payload, ...prev]);
  }
  function removeNote(id: number): void {
    setNotesArr((prev) => {
      prev = prev.filter((note) => {
        return note.id !== id;
      });
      return prev;
    });
  }
  function toggleNote(id: number): void {
    setNotesArr((prev) => {
      prev = prev.map((note) => {
        if (note.id == id) {
          return { ...note, isActive: !note.isActive };
        }
        return note;
      });
      return prev;
    });
  }

  return (
    <DashboardContext.Provider value={{ notesArr, addNote, removeNote, toggleNote, temp, setTemp }}>
      {children}
    </DashboardContext.Provider>
  );
};

