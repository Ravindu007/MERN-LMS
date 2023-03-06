import { useContext } from "react";
import { LessonConext } from "../context/LessonContext";

export const useLessonContext = () => {
  const context = useContext(LessonConext)

  return context
}