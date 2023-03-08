import { useContext } from "react";
import { AssignmentContext } from "../context/AssignmentContext";

export const useAssignmentContext = () => {
  const context = useContext(AssignmentContext)

  return context
}