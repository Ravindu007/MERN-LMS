import { useContext } from "react";
import { SubmissionContext } from "../context/SubmissionContext";

export const useSubmissionContext = () => {
  const context = useContext(SubmissionContext)

  return context
}