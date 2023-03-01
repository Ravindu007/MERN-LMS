import { useContext } from "react";
import { LmsUserContext } from "../context/LmsUSerContext";

export const useLmsUserContext = () => {
  const context = useContext(LmsUserContext)

  return context
}