import { useContext } from "react";
import { SubjectContext } from "../context/SubjectContext";

export const useSubjectContext = () => {
  const context = useContext(SubjectContext)

  return context
}